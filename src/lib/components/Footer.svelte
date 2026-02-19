<script lang="ts">
	import { page } from '$app/state';

	let data = $state(page.data);
</script>

<div class="wh mt-24 flex flex-wrap justify-between gap-4 p-4 type-copy-small lg:gap-8 lg:p-12">
	<div class="m-auto flex gap-4 xl:ml-0">
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

	<div class="m-auto flex gap-2 xl:mr-0">
		<a href="/privacy-policy">Privacy Policy</a>
		<a href="/terms-and-conditions">Terms & Conditions</a>
	</div>

	<div class="m-auto flex xl:mr-0">
		<p>© {new Date().getFullYear()} Omni Energy Therapy</p>
	</div>
</div>
