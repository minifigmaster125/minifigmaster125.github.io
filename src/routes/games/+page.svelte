<script lang="ts">
	import { format } from 'date-fns';
	import { LinkHandler } from '../../utils.js';

	var data = [
		{
				name: "METANOIA",
				description: "A puzzle game about shapes moving other shapes and free will.",
				link: "https://store.steampowered.com/app/4293060/Metanoia/",
				date: "Feb 2026",
		},
		{
				name: "Three-Two-Eight",
				description: "A short top down action game, spiced with ethics. Made in two weeks.",
				link: "https://suchislif3.itch.io/three-two-eight",
				date: "Aug 2025",
		}
	]
</script>

{#each data as game}
	<div class="py-3">
			<div
				class="game flex flex-col flex-wrap items-baseline gap-x-4 gap-y-2 sm:flex-nowrap md:flex-row"
			>
				<p class="flex-none text-sm">{game.date}</p>
				<a class="text-amber-600" href={game.link} target="_blank">{game.name}</a>
				<p>{game.description}</p>
			</div>
	</div>
{/each}
