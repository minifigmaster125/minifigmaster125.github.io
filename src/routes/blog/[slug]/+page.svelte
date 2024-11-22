<script lang="ts">
	import Post from '../../../components/Post.svelte';
	const { data } = $props();
	const { html, metadata } = data;
</script>

<div class="md:max-w-screen-md m-auto">
	<Post {html} {metadata} className="col-span-4" />
</div>
