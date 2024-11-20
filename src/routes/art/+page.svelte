<script lang="ts">
	import AnAfternoonBreak from '$lib/assets/AnAfternoonBreak.webp';
	import HowISteepMyTea from '$lib/assets/HowISteepMyTea.webp';
	import WindmillsOfZaanseSchans from '$lib/assets/WindmillsOfZaanseSchans.webp';
	import AFriendAtTheCanal from '$lib/assets/AFriendAtTheCanal.webp';

	import Image from '../../components/Image.svelte'
</script>

<h1 class="pb-8">Original Work</h1>
<p class="pb-4">
	You can find many more sketches, fan illustrations, and process videos on <a
		class="text-amber-800"
		href="https://www.instagram.com/suchaaverygoodartist">my instagram</a
	>.
</p>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	<Image url={AnAfternoonBreak} title='An Afternoon Break' />
	<Image url={HowISteepMyTea} title='How I Steep My Tea' />
	<Image url={AFriendAtTheCanal} title='A Friend at the Canal' />
	<Image url={WindmillsOfZaanseSchans} title='Windmills of Zaanse Schans' />
</div>
