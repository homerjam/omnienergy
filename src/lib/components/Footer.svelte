<script lang="ts">
	import { page } from '$app/state';

	let data = $state(page.data);
</script>

<div class="mt-24 flex flex-wrap justify-between gap-6 p-4 type-copy-default lg:p-12">
	<div class="m-auto flex gap-6">
		{#if data.settings?.instagramUrl}
			<a href={data.settings?.instagramUrl ?? ''} target="_blank">Instagram</a>
		{/if}
		{#if data.settings?.facebookUrl}
			<a href={data.settings?.facebookUrl ?? ''} target="_blank">Facebook</a>
		{/if}
		{#if data.settings?.linkedinUrl}
			<a href={data.settings?.linkedinUrl ?? ''} target="_blank">LinkedIn</a>
		{/if}
	</div>
	<div class="m-auto">
		<p>© {new Date().getFullYear()} Omni Energy Therapy. All rights reserved.</p>
	</div>
</div>
