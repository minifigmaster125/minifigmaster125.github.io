<script lang="ts">
	import { format } from 'date-fns';

	const { data } = $props();
</script>

<h1 class="pb-8">Articles</h1>
{#each data.posts as post}
	<div class="py-2">
		<a href={`/blog/${post.slug}`}>
			<div class="flex items-baseline gap-x-4">
				<p class="flex-none">{format(post.date, 'PPP')}</p>
				<p>{post.title}</p>
				<div class="w-14 flex-none"></div>
				<div class="flex-none ml-auto flex gap-x-2">
					{#each post.tags as tag}
						<p class="text-sm">{tag}</p>
					{/each}
				</div>
			</div>
		</a>
	</div>
{/each}
