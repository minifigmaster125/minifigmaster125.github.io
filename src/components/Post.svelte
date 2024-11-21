<script lang="ts">
	import { format } from 'date-fns';
	import Tag from './Tag.svelte';

	const { post } = $props();
	const { title, date, tags } = post.meta;
	const formattedDate = format(date, 'PPP');
</script>

<div>
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
		<post.content />
	</div>
</div>
