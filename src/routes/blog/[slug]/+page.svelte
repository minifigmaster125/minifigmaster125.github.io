<script lang="ts">
	import Post from '../../../components/Post.svelte';
	const { data } = $props();
	const { html, meta } = data;
</script>

<svelte:head>
	{#if data.documentUri}
		<link rel="site.standard.document" href={data.documentUri} />
	{/if}
</svelte:head>

<div class="m-auto md:max-w-screen-md">
	<Post {html} metadata={meta} className="col-span-4" />
</div>
