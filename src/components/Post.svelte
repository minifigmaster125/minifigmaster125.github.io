<script lang="ts">
	import { format } from 'date-fns';
	import Tag from './Tag.svelte';

	const { html, metadata, className } = $props();
	const { title, date, tags, read_time } = metadata;
	const tagArray = tags.split(',');
	const formattedDate = format(date, 'PPP');
</script>

<div class={className}>
	<div class="py-4">
		<div class="flex flex-wrap items-baseline justify-between gap-x-4 sm:flex-nowrap gap-y-2">
			<h1>{title}</h1>
			<p class="flex-none">{read_time} min read</p>
		</div>
		<p class="flex-none py-2">{formattedDate}</p>
		<div class="flex gap-x-4">
			{#each tagArray as tag}
				<Tag name={tag} />
			{/each}
		</div>
	</div>

	<div class="prose">
		{@html html}
	</div>
</div>
