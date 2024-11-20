<script lang="ts">
	import { format } from 'date-fns';
	import Tag from '../../../components/Tag.svelte';
	// import Post from '../../../posts/post-1.md';
	// console.log(Post)
	const { data } = $props();
	const { title, date, tags } = data.meta;
	const formattedDate = format(date, 'PPP');
</script>

<div class="max-w-screen-md m-auto">
	<div class="py-4">
		<div class="flex items-baseline justify-between">
			<h1>{title}</h1>
			<p class="flex-none">{formattedDate}</p>
		</div>
		<div class="flex gap-x-4 py-2">
			{#each tags as tag}
				<Tag name={tag} />
			{/each}
		</div>
	</div>

	<div class="prose">
		<data.content />
	</div>
</div>
