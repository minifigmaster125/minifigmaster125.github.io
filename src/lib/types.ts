export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	date: string
	tags: string[]
	published: boolean
	description: string
}

