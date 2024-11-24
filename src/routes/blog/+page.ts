
import { error } from '@sveltejs/kit'
import type { Post } from '$lib'
import type { PageLoad } from './$types';
import  showdown  from "showdown"

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
	try {
        let posts: Post[] = []

	const paths = import.meta.glob('../../posts/*.md', { eager: true })

	for (const path in paths) {
		const slug = path.split('/').at(-1)?.replace('.md', '') as string
		const postRaw = await import(`../../posts/${slug}.md?raw`)
        const html = conv.makeHtml(postRaw.default);
        const metadata = conv.getMetadata(false) as metadata;

        const post = { ...metadata, slug, tags: metadata.tags.split(','), published: metadata.published == 'true' } satisfies Post

        if (post.published){
            posts.push(post)
        }
	}

	posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
	)


	return { posts: posts }
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}