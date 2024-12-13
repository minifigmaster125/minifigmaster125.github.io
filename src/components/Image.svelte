<script>
	const { url, title, above = false } = $props();
	import { Dialog } from 'bits-ui';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		{#if above}
			<h3 class="py-2 text-center">{title}</h3>
		{/if}
		<img class="bg-white p-4 my-4" src={url} alt={title} />
		{#if !above}
			<h3 class="py-2 text-center">{title}</h3>
		{/if}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-[90%] translate-x-[-50%] translate-y-[-50%] md:max-w-[600px]"
		>
			<Dialog.Title class="pb-2 text-center text-white">{title}</Dialog.Title>
			<img class="bg-white p-4" src={url} alt={title} />
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
