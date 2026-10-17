import { readFile } from 'node:fs/promises';
import { PasswordSession } from '@atproto/lex-password-session';
import showdown from 'showdown';

// Existing posts have dates but no times. Treat each date as 9 a.m. Eastern.
function publicationTimestamp(date: string): string {
	const day = new Date(`${date}T09:00:00.000Z`);
	if (
		!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
		Number.isNaN(day.getTime()) ||
		day.toISOString().slice(0, 10) !== date
	) {
		throw new Error(`Invalid publication date: ${date}`);
	}

	const offset = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/New_York',
		timeZoneName: 'longOffset'
	})
		.formatToParts(day)
		.find((part) => part.type === 'timeZoneName')?.value;

	if (!offset || !/^GMT-0[45]:00$/.test(offset)) {
		throw new Error(`Could not determine Eastern time offset for ${date}`);
	}

	return new Date(`${date}T09:00:00${offset.slice(3)}`).toISOString();
}

const slug = process.argv[2];
const publish = process.argv[3] === '--publish';
if (
	!slug ||
	!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
	!(process.argv.length === 3 || (process.argv.length === 4 && publish))
) {
	throw new Error('Usage: node scripts/create-document.ts <post-slug> [--publish]');
}

const markdown = await readFile(new URL(`../src/posts/${slug}.md`, import.meta.url), 'utf8');
const converter = new showdown.Converter({ metadata: true });
converter.makeHtml(markdown);
const metadata = converter.getMetadata() as Record<string, string>;

if (metadata.published?.trim() !== 'true') {
	throw new Error(`Post "${slug}" is not marked published: true.`);
}
if (!metadata.title?.trim() || !metadata.date?.trim()) {
	throw new Error('The post must have a title and date.');
}

// Keep this saved key unchanged when editing or renaming the post.
const rkey = metadata.atproto_rkey?.trim();
if (!rkey || !/^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(rkey)) {
	throw new Error('The post must have an atproto_rkey containing a valid 13-character TID.');
}

const tags = [
	...new Set(
		(metadata.tags ?? '')
			.split(',')
			.map((tag) => tag.trim().toLowerCase().replace(/\s+/g, '-'))
			.filter(Boolean)
	)
];

const publicationUri = (
	await readFile(
		new URL('../static/.well-known/site.standard.publication', import.meta.url),
		'utf8'
	)
).trim();

const publicationMatch = /^at:\/\/(did:[^/]+)\/site\.standard\.publication\/[^/]+$/.exec(
	publicationUri
);
if (!publicationMatch) {
	throw new Error(
		'The publication verification file must contain a publication AT-URI with a DID.'
	);
}
const repo = publicationMatch[1];

const document = {
	$type: 'site.standard.document',
	site: publicationUri,
	path: `/blog/${slug}`,
	title: metadata.title.trim(),
	publishedAt: publicationTimestamp(metadata.date.trim()),
	...(metadata.description?.trim() ? { description: metadata.description.trim() } : {}),
	...(tags.length ? { tags } : {})
};

const uri = `at://${repo}/${document.$type}/${rkey}`;
const request = { repo, collection: document.$type, rkey, record: document };

if (!publish) {
	// Preview does not need credentials or make network requests.
	console.log(JSON.stringify({ uri, request }, null, 2));
} else {
	const service = process.env.ATPROTO_SERVICE;
	const identifier = process.env.ATPROTO_IDENTIFIER;
	const password = process.env.ATPROTO_APP_PASSWORD;
	if (!service || !identifier || !password) {
		throw new Error('Set ATPROTO_SERVICE, ATPROTO_IDENTIFIER, and ATPROTO_APP_PASSWORD.');
	}

	const session = await PasswordSession.login({ service, identifier, password });
	try {
		if (session.did !== repo) {
			throw new Error('The logged-in account does not match the publication owner.');
		}

		const response = await session.fetchHandler('/xrpc/com.atproto.repo.putRecord', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		});
		if (!response.ok) {
			throw new Error(`Document save failed (${response.status}): ${await response.text()}`);
		}

		const result = await response.json();
		console.log('Document URI:', result.uri);
	} finally {
		await session.logout();
	}
}
