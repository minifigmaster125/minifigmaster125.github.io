import { execFileSync } from 'node:child_process';
import { lstatSync, readFileSync, writeFileSync } from 'node:fs';
import { TID } from '@atproto/common-web';
import showdown from 'showdown';

const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' });
process.chdir(git('rev-parse', '--show-toplevel').trim());

const changed = new Set(
	git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').split('\0')
);
const usedKeys = new Map<string, string>();
const pending: { path: string; original: string; end: number }[] = [];

// Read the index (the proposed commit), not unstaged versions of the posts.
for (const entry of git('ls-files', '--stage', '-z', '--', 'src/posts').split('\0')) {
	if (!entry) continue;
	const tab = entry.indexOf('\t');
	const [mode, , stage] = entry.slice(0, tab).split(' ');
	const path = entry.slice(tab + 1);
	if (!/^src\/posts\/[^/]+\.md$/.test(path)) continue;
	if (stage !== '0' || !['100644', '100755'].includes(mode)) {
		throw new Error(`${path}: resolve conflicts and use a regular Markdown file.`);
	}

	const original = git('show', `:${path}`);
	const header = /^(?:\uFEFF)?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(original);
	if (!header) {
		if (changed.has(path)) throw new Error(`${path}: missing Markdown frontmatter.`);
		continue;
	}
	const converter = new showdown.Converter({ metadata: true });
	converter.makeHtml(original);
	const metadata = converter.getMetadata() as Record<string, string>;
	const keyFields = header[1].match(/^atproto_rkey:/gm) ?? [];
	const key = metadata.atproto_rkey?.trim();

	if (
		keyFields.length > 1 ||
		(keyFields.length === 1 &&
			(!key || !/^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(key)))
	) {
		throw new Error(`${path}: atproto_rkey must contain one valid TID.`);
	}
	if (key) {
		const previous = usedKeys.get(key);
		if (previous) throw new Error(`${path}: shares atproto_rkey with ${previous}.`);
		usedKeys.set(key, path);
		continue;
	}
	if (!changed.has(path) || metadata.published?.trim() !== 'true') continue;

	// Never git-add an entire partially staged post: that would include unstaged edits.
	if (!lstatSync(path).isFile() || readFileSync(path, 'utf8') !== original) {
		throw new Error(
			`${path}: needs a TID but has unstaged edits. Fully stage this post or stash its unstaged edits, then commit again.`
		);
	}
	const openingLength = original.indexOf('\n') + 1;
	pending.push({
		path,
		original,
		end: openingLength + header[1].length
	});
}

// Validate every candidate before modifying any files.
for (const { path, original, end } of pending) {
	let key: string;
	do {
		key = TID.nextStr();
	} while (usedKeys.has(key));
	usedKeys.set(key, path);
	const newline = original.includes('\r\n') ? '\r\n' : '\n';
	writeFileSync(
		path,
		`${original.slice(0, end)}${newline}atproto_rkey: ${key}${original.slice(end)}`
	);
	git('add', '--', path);
	console.log(`Assigned ${key} to ${path} and staged it.`);
}
