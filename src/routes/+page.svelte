<script>
	import Post from '../components/Post.svelte';

	const { data } = $props();
</script>

<Post post={data.latestPost} />
