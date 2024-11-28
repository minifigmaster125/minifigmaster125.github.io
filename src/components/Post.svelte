<script lang="ts">
	import { format } from 'date-fns';
	import Tag from './Tag.svelte';
	import type { Metadata } from '$lib';

	interface Props {
		html: string;
		metadata: Metadata;
		className: string;
	}

	const { html, metadata, className }: Props = $props();
	const { title, date, tags, read_time } = metadata;
	const formattedDate = format(date, 'PPP');
</script>

<div class={className}>
	<div class="py-4">
		<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 sm:flex-nowrap">
			<h1>{title}</h1>
			<p class="flex-none">{read_time} min read</p>
		</div>
		<p class="flex-none py-2">{formattedDate}</p>
		<div class="flex gap-x-4">
			{#each tags as tag}
				<Tag name={tag} />
			{/each}
		</div>
	</div>

	<div class="prose">
		{@html html}
	</div>
</div>
