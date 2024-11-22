<script lang="ts">
	import { LinkHandler } from '../../../utils';

	let { children } = $props();
</script>

{@render children()}
<hr class="mx-auto my-8 h-0.5 w-48 rounded border-0 bg-amber-700" />
<p class="pb-4 text-center">
	You can get any new thoughts to your inbox by <a
		class="cursor-pointer text-amber-600"
		href="{LinkHandler('/subscribe')}">subscribing</a
	>.
</p>
