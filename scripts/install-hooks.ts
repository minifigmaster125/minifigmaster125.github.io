import { execFileSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
process.chdir(root);
const target = resolve(
	execFileSync('git', ['rev-parse', '--git-path', 'hooks/pre-commit'], {
		encoding: 'utf8'
	}).trim()
);
const source = readFileSync('.githooks/pre-commit');
if (existsSync(target) && !readFileSync(target).equals(source)) {
	throw new Error(
		`An existing pre-commit hook is installed at ${target}. Merge the hooks manually.`
	);
}
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, source);
chmodSync(target, 0o755);
console.log(`Installed pre-commit hook at ${target}`);
