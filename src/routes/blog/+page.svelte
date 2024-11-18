<script lang="ts">
	import { format } from 'date-fns';

	const { data } = $props();
</script>

<h1 class="pb-4">Articles</h1>
{#each data.posts as post}
	<a href="/blog/post-1">
		<div class="flex gap-x-4 items-baseline">
			<p>{format(post.date, 'PPP')}</p>
			<p>{post.title}</p>
            <div class="flex-none w-14"></div>
            <div class="flex ml-auto gap-x-2">
			{#each post.tags as tag}
				<p class="text-sm">{tag}</p>
			{/each}
            </div>
		</div>
	</a>
{/each}
