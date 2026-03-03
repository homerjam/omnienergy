<script lang="ts">
	import Button from './Button.svelte';

	const {
		class: className,
		isTop = false,
		isSticky = false,
	}: { class?: string | Array<string | boolean>; isTop?: boolean; isSticky?: boolean } = $props();
</script>

<div
	class={[
		'mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 px-4 pt-4 pb-4 lg:flex-row lg:items-center lg:px-12 lg:pt-6 lg:pb-6 xl:px-12',
		className,
	]}
>
	<div class={[isSticky && 'hidden lg:block']}>
		<a href="/">
			<h1 class="type-title">Omni Energy Therapy</h1>
			<h2 class="type-copy-small">Eloisa Cullington | BPsychSc Hons, GradDip Counselling</h2>
		</a>
	</div>

	<div
		class={['mx-auto flex w-full items-center gap-6 lg:mx-0 lg:w-auto', isTop && 'hidden lg:flex']}
	>
		<a href="#services" class="type-copy-default">Services</a>
		<a href="#testimonials" class="type-copy-default">Testimonials</a>
		<!-- <a href="/library" class="type-copy-default">Library</a> -->
		<Button kind="pill" href="/#contact" class="ml-auto">Get in touch</Button>
	</div>
</div>
