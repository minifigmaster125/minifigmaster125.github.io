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
		<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 sm:flex-nowrap py-2">
			<h1>{title}</h1>
			<!-- <p class="flex-none">{read_time} min read</p> -->
            <div class="flex gap-x-1">
                {#each tags as tag, i}
                    <Tag name={tag} />
                    {#if i < tags.length - 1}
                        <span class="text-sm text-amber-700">&middot;</span> 
                    {/if}
                {/each}
            </div>
		</div>
		<!-- <p class="flex-none py-2">{formattedDate}</p> -->
        <p class="flex-none py-2 text-sm text-amber-700">{formattedDate}</p>
        <p class="flex-none  text-sm text-amber-700">{read_time} minute read</p>
	</div>

	<div class="prose">
		{@html html}
	</div>
</div>
