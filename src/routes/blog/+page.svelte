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
	<div class="py-2">
		<a href={LinkHandler(`/blog/${post.metadata.slug}`)}>
			<div class="flex flex-wrap items-baseline gap-x-4 gap-y-2 sm:flex-nowrap">
				<p class="flex-none w-48">{format(post.metadata.date, 'PPP')}</p>
				<p>{post.metadata.title}</p>
				<div class="w-14 flex-none"></div>
				<div class="ml-auto flex flex-none gap-x-2">
					{#each post.metadata.tags as tag}
						<Tag name={tag} />
					{/each}
				</div>
			</div>
		</a>
	</div>
{/each}
