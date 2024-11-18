<script lang="ts">
	import { format } from 'date-fns';
	// import Post from '../../../posts/post-1.md';
    // console.log(Post)
	const { data } = $props();
	const { title, date, tags } = data.meta;
	const formattedDate = format(date, 'PPP');
</script>

<div class="py-4">
	<div class="flex items-baseline justify-between">
		<h1>{title}</h1>
		<p>{formattedDate}</p>
	</div>
	<div class="flex gap-x-4 py-2">
		{#each tags as tag}
			<p class="text-sm text-amber-700">
				{tag}
			</p>
		{/each}
	</div>
</div>

<div class="prose">
	<data.content />
</div>
