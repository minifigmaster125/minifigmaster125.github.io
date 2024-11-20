
import { error } from '@sveltejs/kit'
// import { Post } from '../../lib/types.ts'
import * as fs from 'fs';
import { LinkHandler } from '../../utils';

// Function to replace image URLs in a Markdown file
function replaceImageUrlsInMarkdown(filePath: string, urlReplacer: (url: string) => string): void {
    // Read the markdown file content
    const markdownContent = fs.readFileSync(filePath, 'utf-8');

    // Regular expression to match image URLs in Markdown (e.g. ![alt](url))
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

    // Replace image URLs using the urlReplacer function
    const updatedContent = markdownContent.replace(imageRegex, (match, altText, url) => {
        const newUrl = urlReplacer(url);  // Call the provided function to replace the URL
        return `![${altText}](${newUrl})`;  // Return the updated Markdown syntax
    });

    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
}




export async function load({ params }) {
	try {
        let posts: Post[] = []

	const paths = import.meta.glob('../../posts/*.md', { eager: true })

	for (const path in paths) {
        replaceImageUrlsInMarkdown(path, LinkHandler);
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
            const tags = metadata.tags
			const post = { ...metadata, slug } satisfies Post
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