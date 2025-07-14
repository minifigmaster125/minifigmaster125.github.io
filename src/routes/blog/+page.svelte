<script lang="ts">
	import { format } from 'date-fns';
	import { LinkHandler } from '../../utils.js';
	import Tag from '../../components/Tag.svelte';

	const { data } = $props();
</script>

<p class="pb-4">
	You can get any new thoughts to your inbox by <a
		class="cursor-pointer text-amber-600"
		href={LinkHandler('/subscribe')}>subscribing</a
	>.
</p>
{#each data.posts as post}
	<div class="py-3">
		<a href={LinkHandler(`/blog/${post.metadata.slug}`)}>
			<div
				class="flex flex-col flex-wrap items-baseline gap-x-4 gap-y-2 sm:flex-nowrap md:flex-row"
			>
				<p class="w-48 flex-none text-sm">{format(post.metadata.date, 'PP')}</p>
				<p>{post.metadata.title}</p>
				<div class="hidden w-14 flex-none md:block"></div>
				<div class="flex flex-none gap-x-2 md:ml-auto">
					{#each post.metadata.tags as tag}
						<Tag name={tag} />
					{/each}
				</div>
			</div>
		</a>
	</div>
{/each}
