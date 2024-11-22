<script lang="ts">
	import Post from '../../../components/Post.svelte';
	const { data } = $props();
	const { html, metadata } = data;
</script>

<div class="grid grid-cols-5 gap-8">
	<Post {html} {metadata} className="col-span-4" />
	<div class="py-4">
		<!-- <form
			action="https://buttondown.com/api/emails/embed-subscribe/suchislife"
			method="post"
			target="popupwindow"
			onsubmit={window.open('https://buttondown.com/suchislife', 'popupwindow')}
			class="embeddable-buttondown-form text-center"
		>
			<label for="bd-email" class="text-sm">Ge the latest</label>
			<input type="email" name="email" id="bd-email" class="w-full my-2" placeholder="email" />

			<input type="submit" value="Subscribe" class="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer px-4 py-2"/>
		</form> -->
	</div>
</div>
