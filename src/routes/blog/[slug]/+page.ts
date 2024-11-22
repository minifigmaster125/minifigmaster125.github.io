
import { error } from '@sveltejs/kit'
import  showdown  from "showdown"

const conv = new showdown.Converter({metadata: true});

export async function load({ params }) {
	try {
		const postRaw = await import(`../../../posts/${params.slug}.md?raw`)
        const html = conv.makeHtml(postRaw.default);
        const metadata = conv.getMetadata(false);
		return {
            html,
			metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
