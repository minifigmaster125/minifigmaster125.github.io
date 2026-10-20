import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const scripts = fileURLToPath(new URL('.', import.meta.url));
const hook = readFileSync(new URL('../.githooks/pre-commit', import.meta.url));
const tid = '3my3dit427b22';
const post = (published = true, key = '') =>
	`---\ntitle: Test\ndate: 2026-10-20\npublished: ${published}\n${key ? `atproto_rkey: ${key}\n` : ''}---\n\nBody\n`;

function fixture(t) {
	const cwd = mkdtempSync(join(tmpdir(), 'post-tids-test-'));
	t.after(() => rmSync(cwd, { recursive: true, force: true }));
	const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' });
	git('init', '-q');
	git('config', 'user.name', 'Hook test');
	git('config', 'user.email', 'test@example.invalid');
	git('config', 'commit.gpgsign', 'false');
	mkdirSync(join(cwd, 'src/posts'), { recursive: true });
	mkdirSync(join(cwd, '.githooks'));
	writeFileSync(join(cwd, '.githooks/pre-commit'), hook);
	symlinkSync(scripts, join(cwd, 'scripts'));
	const run = (name = 'assign-post-tids.ts') =>
		spawnSync(process.execPath, [join(scripts, name)], { cwd, encoding: 'utf8' });
	const write = (name, content) => writeFileSync(join(cwd, `src/posts/${name}.md`), content);
	const read = (name) => readFileSync(join(cwd, `src/posts/${name}.md`), 'utf8');
	return { cwd, git, run, write, read };
}

test('installed hook adds keys to the commit, skips drafts, and preserves keys on edits', (t) => {
	const f = fixture(t);
	assert.equal(f.run('install-hooks.ts').status, 0);
	assert.equal(f.run('install-hooks.ts').status, 0);
	f.write('published', post());
	f.write('another', post());
	f.write('draft', post(false));
	f.git('add', 'src/posts');
	f.git('commit', '-qm', 'Publish posts');
	const first = f.read('published');
	const key = first.match(/^atproto_rkey: (.+)$/m)?.[1];
	assert.match(key, /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/);
	assert.notEqual(key, f.read('another').match(/^atproto_rkey: (.+)$/m)?.[1]);
	assert.equal(f.git('show', 'HEAD:src/posts/published.md'), first);
	assert.equal(f.read('draft'), post(false));
	assert.equal(f.git('diff', '--', 'src/posts'), '');
	f.write('published', first + 'An edit\n');
	f.git('add', 'src/posts/published.md');
	f.git('commit', '-qm', 'Edit post');
	assert.equal(f.read('published').match(/^atproto_rkey: (.+)$/m)[1], key);
});

test('partial staging blocks all key assignments without modifying the index or worktree', (t) => {
	const f = fixture(t);
	f.write('a-ready', post());
	f.write('z-partial', post());
	f.git('add', 'src/posts');
	f.write('z-partial', post() + 'Unstaged text\n');
	const tree = f.git('write-tree');
	const result = f.run();
	assert.notEqual(result.status, 0);
	assert.match(result.stderr, /unstaged edits/);
	assert.equal(f.git('write-tree'), tree);
	assert.equal(f.read('a-ready'), post());
	assert.equal(f.read('z-partial'), post() + 'Unstaged text\n');
});

test('partially staged posts with existing keys need no changes', (t) => {
	const f = fixture(t);
	f.write('existing', post(true, tid));
	f.git('add', 'src/posts');
	f.write('existing', post(true, tid) + 'Unstaged text\n');
	assert.equal(f.run().status, 0);
	assert.equal(f.git('show', ':src/posts/existing.md'), post(true, tid));
	assert.match(f.read('existing'), /Unstaged text/);
});

test('duplicate and invalid keys block generation', (t) => {
	const f = fixture(t);
	f.write('one', post(true, tid));
	f.write('two', post(true, tid));
	f.git('add', 'src/posts');
	assert.match(f.run().stderr, /shares atproto_rkey/);
	f.write('two', post(true, 'zzzzzzzzzzzzz'));
	f.git('add', 'src/posts');
	assert.match(f.run().stderr, /one valid TID/);
});

test('new keys preserve CRLF and ignore untracked posts', (t) => {
	const f = fixture(t);
	f.git('config', 'core.autocrlf', 'false');
	f.write('windows', post().replaceAll('\n', '\r\n'));
	f.write('untracked', post());
	f.git('add', 'src/posts/windows.md');
	assert.equal(f.run().status, 0);
	assert.match(f.read('windows'), /\r\natproto_rkey: .+\r\n---/);
	assert.equal(f.read('untracked'), post());
});

test('installer refuses to overwrite a different hook', (t) => {
	const f = fixture(t);
	const path = join(f.cwd, '.git/hooks/pre-commit');
	writeFileSync(path, '#!/bin/sh\nexit 0\n');
	assert.notEqual(f.run('install-hooks.ts').status, 0);
	assert.equal(readFileSync(path, 'utf8'), '#!/bin/sh\nexit 0\n');
});
