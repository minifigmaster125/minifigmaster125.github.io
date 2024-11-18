<script lang="ts">
	import '../app.css';
	import { DropdownMenu } from 'bits-ui';
	let { children } = $props();
</script>

<div class="flex min-h-screen justify-center bg-amber-50 py-8">
	<div class="md:w-[768px]">
		<div class="flex items-center justify-between">
			<a href="/" class="container mx-auto py-8 font-serif">
				<h1 class="text-2xl">such is life</h1>
				<p class="text-sm">and other contemplation.</p>
			</a>
			<nav class="flex gap-x-8 font-serif">
				<a href="/blog">blog</a>
				<a href="/art">original</a>
				<!-- <DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<p>art</p>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="center" class="bg-amber-100 p-2">
						<DropdownMenu.Item class="p-2">
							<a class="font-serif" href="/art/original">original</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item class="p-2">
							<a class="font-serif" href="/art/fanart">fan art</a>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root> -->
				<a href="/about">about</a>
			</nav>
		</div>
		{@render children()}
	</div>
</div>
