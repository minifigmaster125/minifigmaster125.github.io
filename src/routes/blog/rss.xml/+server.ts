import { error } from "@sveltejs/kit"
import type { Metadata, Post } from "$lib"
import  showdown  from "showdown"

const name = 'such is life'
const website='https://suchaaverchahal.com'
const description='Contemplation during creation - art, engineering, etc.'

const conv = new showdown.Converter({metadata: true});

interface metadata {
    title: string,
    slug: string,
    date: string,
    description: string,
    tags: string
    published: string //should be 'true' or 'false'
}

async function getPosts() {
	try {
        let posts: Post[] = []

	const paths = import.meta.glob('../../../posts/*.md', { eager: true })

	for (const path in paths) {
		const slug = path.split('/').at(-1)?.replace('.md', '') as string
    const rawMarkdown = await import(`../../../posts/${slug}.md?raw`)
    const html = conv.makeHtml(rawMarkdown.default);
    const metadata = conv.getMetadata(false) as metadata;

    const meta = { ...metadata, slug, tags: metadata.tags.split(','), published: metadata.published == 'true' } satisfies Metadata
    const post = {metadata: meta, html} 
    if (meta.published) {
      posts.push(post)
    }
	}

	posts = posts.sort((first, second) =>
    new Date(second.metadata.date).getTime() - new Date(first.metadata.date).getTime()
	)


	return posts
	} catch (e) {
		error(500, `Error getting posts ${e}`)
	}
  }

  export const prerender = true

  export async function GET() {
    const posts = await getPosts()
    const body = xml(posts)
  
    const headers = {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
    }
    return new Response(body, {headers})
  }
  
  const xml =
    (posts: Post[]) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>${name}</title>
      <link>${website}</link>
      <description>${description}</description>
      ${posts
        .map(
          post =>
            `
          <item>
            <title>${post.metadata.title}</title>
            <description>${post.metadata.description}</description>
            <link>${website}/blog/${post.metadata.slug}</link>
            <pubDate>${new Date(post.metadata.date)}</pubDate>
            <content:encoded>
                ${post.html}
              </content:encoded>
          </item>
        `,
        )
        .join('')}
    </channel>
  </rss>`