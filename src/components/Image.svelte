<script>
	const { url, title } = $props();
    import { Dialog } from "bits-ui";
</script>

<Dialog.Root>
    <Dialog.Trigger>
        <img class="bg-white p-4" src={url} alt={title} />
        <p class="text-center py-2">{title}</p>
    </Dialog.Trigger>
    <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80"/>
        <Dialog.Content class="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[90%] md:max-w-[600px]">
            <Dialog.Title class="text-white text-center pb-2">{title}</Dialog.Title>
            <img class="bg-white p-4" src={url} alt={title} />
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
