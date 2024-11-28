
import type { Metadata, Post } from '$lib';
import { error } from '@sveltejs/kit'
import  showdown  from "showdown"
import type { PageLoad } from '../$types';

const conv = new showdown.Converter({metadata: true});

interface metadata {
    title: string,
    slug: string,
    date: string,
    description: string,
    tags: string
    published: string //should be 'true' or 'false'
}

export const load : PageLoad = async ({ params }) => {
	const postPath = `../../../posts/${params.slug}.md`
	try {
		const slug = postPath.split('/').at(-1)?.replace('.md', '') as string
		const postRaw = await import(`../../../posts/${params.slug}.md?raw`)
        const html = conv.makeHtml(postRaw.default);
        const metadata = conv.getMetadata(false) as unknown as metadata;
        const meta = { ...metadata, slug, tags: metadata.tags.split(','), published: metadata.published == 'true' } satisfies Metadata
		return {
            html,
			meta	
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
