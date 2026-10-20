import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { PasswordSession } from '@atproto/lex-password-session';

const owner = 'did:plc:4m4xvevf6k6edjfbpdkh5463';
const key = '3my3dit427b22';
const secondKey = '3my3dit427b23';
const post = (rkey = key, published = true) =>
	`---\ntitle: Test\ndate: 2026-09-22\npublished: ${published}\ntags: Game Dev,game-dev\n${rkey ? `atproto_rkey: ${rkey}\n` : ''}---\n\nFull body must stay off the PDS.\n`;

async function run(posts, args, options = {}) {
	const root = mkdtempSync(join(tmpdir(), 'document-sync-test-'));
	mkdirSync(join(root, 'scripts'));
	mkdirSync(join(root, 'src/posts'), { recursive: true });
	mkdirSync(join(root, 'static/.well-known'), { recursive: true });
	writeFileSync(join(root, 'package.json'), '{"type":"module"}');
	copyFileSync(
		new URL('./create-document.ts', import.meta.url),
		join(root, 'scripts/create-document.ts')
	);
	symlinkSync(new URL('../node_modules', import.meta.url).pathname, join(root, 'node_modules'));
	writeFileSync(
		join(root, 'static/.well-known/site.standard.publication'),
		`at://${owner}/site.standard.publication/3mxztiai4tw22\n`
	);
	for (const [slug, content] of Object.entries(posts)) {
		writeFileSync(join(root, `src/posts/${slug}.md`), content);
	}

	const previous = {
		argv: process.argv,
		login: PasswordSession.login,
		log: console.log,
		fetch: globalThis.fetch
	};
	const envNames = ['ATPROTO_SERVICE', 'ATPROTO_IDENTIFIER', 'ATPROTO_APP_PASSWORD'];
	const env = envNames.map((name) => process.env[name]);
	const result = { logins: 0, logouts: 0, requests: [], output: [], error: undefined };
	try {
		for (const name of envNames) {
			if (options.noCredentials) delete process.env[name];
			else process.env[name] = 'test-only';
		}
		process.argv = ['node', join(root, 'scripts/create-document.ts'), ...args];
		console.log = (...values) => result.output.push(values.join(' '));
		globalThis.fetch = () => {
			throw new Error('Unexpected real network request');
		};
		PasswordSession.login = async () => {
			result.logins++;
			return {
				did: options.wrongOwner ? 'did:plc:other' : owner,
				fetchHandler: async (path, init) => {
					assert.equal(path, '/xrpc/com.atproto.repo.putRecord');
					assert.equal(init.method, 'POST');
					const request = JSON.parse(init.body);
					result.requests.push(request);
					if (options.failWrite) return new Response('Test failure', { status: 500 });
					return Response.json({
						uri: `at://${request.repo}/${request.collection}/${request.rkey}`
					});
				},
				logout: async () => result.logouts++
			};
		};
		try {
			await import(pathToFileURL(join(root, 'scripts/create-document.ts')).href);
		} catch (error) {
			result.error = error;
		}
	} finally {
		process.argv = previous.argv;
		PasswordSession.login = previous.login;
		console.log = previous.log;
		globalThis.fetch = previous.fetch;
		envNames.forEach((name, i) => {
			if (env[i] === undefined) delete process.env[name];
			else process.env[name] = env[i];
		});
		rmSync(root, { recursive: true, force: true });
	}
	return result;
}

test('batch preview skips drafts and does not authenticate', async () => {
	const result = await run({ first: post(), draft: post('', false) }, ['--all']);
	assert.equal(result.error, undefined);
	assert.equal(result.logins, 0);
	const documents = JSON.parse(result.output[0]);
	assert.equal(documents.length, 1);
	assert.deepEqual(documents[0].request.record.tags, ['game-dev']);
	assert.equal(documents[0].request.record.publishedAt, '2026-09-22T13:00:00.000Z');
});

test('batch publishing uses one session and stable keys, without post bodies', async () => {
	const posts = { first: post(), second: post(secondKey), draft: post('', false) };
	const first = await run(posts, ['--all', '--publish']);
	const repeat = await run(posts, ['--all', '--publish']);
	assert.equal(first.error, undefined);
	assert.equal(repeat.error, undefined);
	assert.equal(first.logins, 1);
	assert.equal(first.logouts, 1);
	assert.equal(first.requests.length, 2);
	assert.deepEqual(first.requests, repeat.requests);
	assert.deepEqual(
		first.requests.map((request) => request.rkey),
		[key, secondKey]
	);
	for (const request of first.requests) {
		assert.equal(request.record.content, undefined);
		assert.equal(request.record.textContent, undefined);
	}
});

test('missing or duplicate keys fail before any login or write', async () => {
	for (const [second, error] of [
		[post(''), /valid 13-character TID/],
		[post(), /Duplicate/]
	]) {
		const result = await run({ first: post(), second }, ['--all', '--publish']);
		assert.match(result.error.message, error);
		assert.equal(result.logins, 0);
		assert.equal(result.requests.length, 0);
	}
});

test('wrong account and failed writes log out and fail the run', async () => {
	const posts = { first: post(), second: post(secondKey) };
	const wrong = await run(posts, ['--all', '--publish'], { wrongOwner: true });
	assert.match(wrong.error.message, /does not match/);
	assert.equal(wrong.requests.length, 0);
	assert.equal(wrong.logouts, 1);
	const failed = await run(posts, ['--all', '--publish'], { failWrite: true });
	assert.match(failed.error.message, /Document save failed for \/blog\/first/);
	assert.equal(failed.requests.length, 1);
	assert.equal(failed.logouts, 1);
});

test('empty batch needs no credentials; publishing a nonempty batch requires them', async () => {
	const empty = await run({ draft: post('', false) }, ['--all', '--publish'], {
		noCredentials: true
	});
	assert.equal(empty.error, undefined);
	assert.equal(empty.logins, 0);
	const missing = await run({ first: post() }, ['--all', '--publish'], { noCredentials: true });
	assert.match(missing.error.message, /Set ATPROTO_SERVICE/);
	assert.equal(missing.logins, 0);
});

test('single-post mode and argument validation remain intact', async () => {
	const single = await run({ first: post() }, ['first']);
	assert.equal(single.error, undefined);
	assert.equal(JSON.parse(single.output[0]).request.rkey, key);
	const draft = await run({ draft: post('', false) }, ['draft']);
	assert.match(draft.error.message, /not marked published/);
	const invalid = await run({ first: post() }, ['--all', '--publsh']);
	assert.match(invalid.error.message, /Usage:/);
	assert.equal(invalid.logins, 0);
});
