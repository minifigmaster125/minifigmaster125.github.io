<script>
	const { url, title } = $props();
</script>

<div>
	<img class="bg-white p-4" src={url} alt={title} />
	<p class="text-center py-2">{title}</p>
</div>
