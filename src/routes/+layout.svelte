<script lang="ts">
	import '../app.css';
	import { LinkHandler } from '../utils';

	let { children } = $props();
</script>

<div class="flex min-h-screen justify-center bg-amber-100 py-8">
	<div class="md:w-[768px]">
		<div class="flex items-center justify-between pb-8">
			<a href={LinkHandler('/')} class="container mx-auto py-8 font-serif">
				<h1 class="text-2xl">such is life</h1>
				<p class="text-sm">and other contemplation.</p>
			</a>
			<nav class="flex gap-x-8 font-serif">
				<a href={LinkHandler('/blog')}>blog</a>
				<a href={LinkHandler('/art')}>art</a>
				<a href={LinkHandler('/about')}>about</a>
			</nav>
		</div>
		{@render children()}
	</div>
</div>
