<script lang="ts">
	import { LinkHandler } from '../utils';

	const { src, title, to, price } = $props();
</script>

<a href={LinkHandler(to)}>
	<img class="my-4 bg-white p-4" {src} alt={title} />
	<div class="flex justify-between px-4">
		<p class="font-serif">{title}</p>
		<p class="font-serif">${price}</p>
	</div>
</a>

