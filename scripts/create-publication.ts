import { PasswordSession } from '@atproto/lex-password-session';

// Generated once: keep this key unchanged so every run targets the same publication.
const publicationRkey = '3mxztiai4tw22';

const publication = {
	$type: 'site.standard.publication',
	name: 'Such Is Life',
	url: 'https://suchaaverchahal.com'
};

const service = process.env.ATPROTO_SERVICE;
const identifier = process.env.ATPROTO_IDENTIFIER;
const password = process.env.ATPROTO_APP_PASSWORD;

if (!service || !identifier || !password) {
	throw new Error('Set ATPROTO_SERVICE, ATPROTO_IDENTIFIER, and ATPROTO_APP_PASSWORD.');
}

const session = await PasswordSession.login({
	service,
	identifier,
	password
});

console.log('Logged in as:', session.did);

const response = await session.fetchHandler('/xrpc/com.atproto.repo.putRecord', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		repo: session.did,
		collection: publication.$type,
		rkey: publicationRkey,
		record: publication
	})
});

if (!response.ok) {
	throw new Error(`Publication save failed (${response.status}): ${await response.text()}`);
}

const result = await response.json();
console.log('Publication URI:', result.uri);
