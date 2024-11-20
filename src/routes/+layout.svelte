<script lang="ts">
	import '../app.css';
	let { children } = $props();

	// for static site adapter
	export const prerender = true;
</script>

<div class="flex min-h-screen justify-center bg-amber-100 py-8">
	<div class="md:w-[768px]">
		<div class="flex items-center justify-between pb-8">
			<a href="/" class="container mx-auto py-8 font-serif">
				<h1 class="text-2xl">such is life</h1>
				<p class="text-sm">and other contemplation.</p>
			</a>
			<nav class="flex gap-x-8 font-serif">
				<a href="/blog">blog</a>
				<a href="/art">art</a>
				<a href="/about">about</a>
			</nav>
		</div>
		{@render children()}
	</div>
</div>
