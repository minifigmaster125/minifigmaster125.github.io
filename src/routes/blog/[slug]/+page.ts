
import type { Metadata, Post } from '$lib';
import { error } from '@sveltejs/kit'
import  showdown  from "showdown"
import type { PageLoad } from './$types';
import publicationUri from '../../../../static/.well-known/site.standard.publication?raw';

const conv = new showdown.Converter({metadata: true});
conv.setOption('moreStyling', true)

interface metadata {
    title: string,
    slug: string,
    date: string,
    description: string,
    tags: string
    published: string //should be 'true' or 'false'
    atproto_rkey?: string
}

export const load : PageLoad = async ({ params }) => {
	const postPath = `../../../posts/${params.slug}.md`
	try {
		const slug = postPath.split('/').at(-1)?.replace('.md', '') as string
		const postRaw = await import(`../../../posts/${params.slug}.md?raw`)
        const html = conv.makeHtml(postRaw.default);
        const metadata = conv.getMetadata(false) as unknown as metadata;
        const meta = { ...metadata, slug, tags: metadata.tags.split(','), published: metadata.published == 'true' } satisfies Metadata
		const rkey = metadata.atproto_rkey?.trim();
		const documentUri = meta.published && rkey && /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(rkey)
			? `${publicationUri.trim().split('/site.standard.publication/')[0]}/site.standard.document/${rkey}`
			: null;
		return {
            html,
			documentUri,
			meta	
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
