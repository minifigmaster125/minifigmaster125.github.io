<script lang="ts">
	import { format } from 'date-fns';
	import Tag from './Tag.svelte';

	const { html, metadata, className } = $props();
	const { title, date, tags } = metadata;
	const tagArray = tags.split(',');
	const formattedDate = format(date, 'PPP');
</script>

<div class={className}>
	<div class="py-4">
		<h1>{title}</h1>
		<p class="flex-none pt-2">{formattedDate}</p>
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
