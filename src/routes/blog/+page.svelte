<script lang="ts">
	import { format } from 'date-fns';
	import { LinkHandler } from '../../utils.js';
	import Tag from '../../components/Tag.svelte';

	const { data } = $props();
</script>

<p class="pb-4"> You can get any new thoughts to your inbox by <a  class="text-amber-600 cursor-pointer" href="{LinkHandler("/subscribe")}">subscribing</a>.</p> 
{#each data.posts as post}
	<div class="py-2">
		<a href={LinkHandler(`/blog/${post.slug}`)}>
			<div class="flex flex-wrap sm:flex-nowrap items-baseline gap-x-4 gap-y-2">
				<p class="flex-none">{format(post.date, 'PPP')}</p>
				<p>{post.title}</p>
				<div class="w-14 flex-none"></div>
				<div class="ml-auto flex flex-none gap-x-2">
					{#each post.tags as tag}
						<Tag name={tag} />
					{/each}
				</div>
			</div>
		</a>
	</div>
{/each}
