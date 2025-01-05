<script lang="ts">
	import Card from '../../components/Card.svelte';
	import Image from '../../components/Image.svelte';
	import { LinkHandler } from '../../utils';
	import Products from '../../products.json';
</script>

<!-- <h1 class="pb-8">Fine Art Prints</h1> -->
<h1 class="pb-8">Original Work</h1>
<p class="pb-4">
	You can find many more sketches, fan illustrations, and process videos on <a
		class="text-amber-800"
		href="https://www.instagram.com/suchaaverygoodartist">my instagram</a
	>.
</p>
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
	{#each Products as product}
		<Image url={product.imageUrl} title={product.name} />
		<!-- after shop is operational -->
		<!-- <Card
			to={`/art/${product.slug}`}
			src={product.imageUrl}
			title={product.name}
			price={product.price}
		/> -->
	{/each}
	<Image url={LinkHandler('/HowISteepMyTea.webp')} title="How I Steep My Tea" />
	<Image url={LinkHandler('/Mack.webp')} title="Mack" />
	<Image url={LinkHandler('/momsLily.jpg')} title="Mom's Lily" />
	<Image url={LinkHandler('/bisonOfUtah.webp')} title="Bison in Utah" />
	<Image url={LinkHandler('/little_flower.jpg')} title="Rose" />
</div>
