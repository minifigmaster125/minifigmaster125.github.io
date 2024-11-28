export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	metadata: Metadata,
	html: string
}

export interface Metadata {
    title: string,
    slug: string,
    date: string,
    description: string,
    tags: string[]
	read_time?: string
    published: boolean //should be 'true' or 'false'
}