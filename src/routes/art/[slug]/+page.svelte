<script lang="ts">
	import type { PageData } from '../$types';
	import Image from '../../../components/Image.svelte';

	const { data }: { data: PageData } = $props();
	const { name, description, imageUrl, slug, price, size } = data;
</script>

<div class="grid grid-cols-2 gap-24">
	<Image url={imageUrl} />
	<div class="flex flex-col gap-8 py-4">
		<h1 class="font-serif">{name}</h1>
		<p>{description}</p>
		<p>{size} inches</p>
		<p>${price}</p>

		<p>Printed on 100lb Giclee archival quality paper.</p>
		<button
			class="snipcart-add-item w-full rounded border-2 border-amber-700 bg-transparent px-4 py-2 font-semibold text-amber-700 hover:border-transparent hover:bg-amber-700 hover:text-white"
			data-item-id={slug}
			data-item-price={price}
			data-item-url={`https://selected-closely-starling.ngrok-free.app/art/${slug}`}
			data-item-description={`${size} inch fine art print on 100lb giclee archival paper.`}
			data-item-name={name}
			data-item-image={imageUrl}
		>
			<p>Add to Cart</p>
		</button>
	</div>
</div>
