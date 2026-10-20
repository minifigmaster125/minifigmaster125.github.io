import { readFile, readdir } from 'node:fs/promises';
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

const target = process.argv[2];
const all = target === '--all';
const publish = process.argv[3] === '--publish';
if (
	!target ||
	(!all && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(target)) ||
	!(process.argv.length === 3 || (process.argv.length === 4 && publish))
) {
	throw new Error('Usage: node scripts/create-document.ts <post-slug|--all> [--publish]');
}

async function prepareDocument(slug: string) {
	const markdown = await readFile(new URL(`../src/posts/${slug}.md`, import.meta.url), 'utf8');
	const converter = new showdown.Converter({ metadata: true });
	converter.makeHtml(markdown);
	const metadata = converter.getMetadata() as Record<string, string>;

	if (metadata.published?.trim() !== 'true') {
		if (all) return null;
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

	return { uri, request };
}

const slugs = all
	? (await readdir(new URL('../src/posts/', import.meta.url)))
			.filter((name) => name.endsWith('.md'))
			.map((name) => name.slice(0, -3))
			.sort()
	: [target];
const documents: NonNullable<Awaited<ReturnType<typeof prepareDocument>>>[] = [];
const seen = new Set<string>();
for (const slug of slugs) {
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new Error(`Invalid post filename: ${slug}.md`);
	}
	const document = await prepareDocument(slug);
	if (!document) continue;
	if (seen.has(document.uri)) throw new Error(`Duplicate record key in ${slug}.md`);
	seen.add(document.uri);
	documents.push(document);
}

if (!publish) {
	// Validate the entire batch before authentication or any writes.
	console.log(JSON.stringify(all ? documents : documents[0], null, 2));
} else if (!documents.length) {
	console.log('No published posts to sync.');
} else {
	const service = process.env.ATPROTO_SERVICE;
	const identifier = process.env.ATPROTO_IDENTIFIER;
	const password = process.env.ATPROTO_APP_PASSWORD;
	if (!service || !identifier || !password) {
		throw new Error('Set ATPROTO_SERVICE, ATPROTO_IDENTIFIER, and ATPROTO_APP_PASSWORD.');
	}

	const session = await PasswordSession.login({ service, identifier, password });
	try {
		if (documents.some(({ request }) => request.repo !== session.did)) {
			throw new Error('The logged-in account does not match the publication owner.');
		}

		for (const { request } of documents) {
			const response = await session.fetchHandler('/xrpc/com.atproto.repo.putRecord', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(request)
			});
			if (!response.ok) {
				throw new Error(
					`Document save failed for ${request.record.path} (${response.status}): ${await response.text()}`
				);
			}

			const result = await response.json();
			console.log('Document URI:', result.uri);
		}
		console.log(`Synced ${documents.length} document record(s).`);
	} finally {
		await session.logout();
	}
}
