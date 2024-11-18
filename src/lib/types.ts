export type Categories = 'sveltekit' | 'svelte'

export interface Post {
	title: string
	slug: string
	date: string
	tags: string[]
}
