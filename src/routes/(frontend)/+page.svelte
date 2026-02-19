<script lang="ts">
	import { onMount } from 'svelte';
	import { toHTML } from '@portabletext/to-html';
	import { imageUrl } from '$lib/helpers';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';

	let { data }: { data: PageData } = $props();

	let headerVisible = $state(false);
	let sentinelEl: HTMLDivElement | undefined;

	onMount(() => {
		if (!sentinelEl) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				// Only show header when sentinel has scrolled past the top (above viewport)
				const pastTop = entry.boundingClientRect.top < 0;
				headerVisible = pastTop;
			},
			{ rootMargin: '-1px 0px 0px 0px', threshold: 0 }
		);
		observer.observe(sentinelEl);
		return () => observer.disconnect();
	});

	$inspect(data);
</script>

<div class="absolute top-0 left-0 z-1 w-full">
	<Header class="text-white" />
</div>

<div
	class="relative z-0 flex h-[60vh] w-full flex-col overflow-hidden px-4 py-6 lg:h-[66vh] lg:p-12"
>
	<p class="relative z-2 mt-auto text-3xl text-white lg:text-5xl">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.home?.tagline?.replace(/\n/g, '<br />')}
	</p>

	<div class="absolute inset-0 z-1 bg-linear-0 from-black/75 via-transparent to-black/50"></div>
	<img
		class="absolute top-0 left-0 z-0 h-full w-full scale-120 object-cover lg:object-[50%]"
		src={imageUrl(data.home?.coverImage, { width: 2240, height: 1260, quality: 80, sharpen: 1 })}
		alt={data.home?.coverImage?.alt}
	/>
</div>

<div bind:this={sentinelEl} class="h-px w-full" aria-hidden="true"></div>
<div
	class="sticky top-0 z-2 -mt-px w-full bg-linear-0 from-transparent via-off-white/10 via-[0.5rem] to-off-white to-[2rem] transition-opacity duration-75"
	class:opacity-0={!headerVisible}
	class:opacity-100={headerVisible}
	class:pointer-events-none={!headerVisible}
>
	<Header />
</div>

<!-- <div class="flex p-32 pb-8">
	<p class="text-center text-3xl">
		My work is grounded in a simple belief: When you understand your inner world, you gain the power
		to change your outer world.
	</p>
</div> -->

<div class="flex gap-6 px-4 lg:gap-12 lg:px-24 2xl:px-48">
	<div class="w-auto shrink-0 lg:w-1/2">
		<img
			class="sticky top-28 m-auto max-h-[50vw] rounded-2xl sm:max-h-[50vw] lg:max-h-[75vh]"
			src={imageUrl(data.home?.profileImage, { width: 1024, quality: 80, sharpen: 1 })}
			alt={data.home?.profileImage?.alt}
			loading="lazy"
		/>
	</div>

	<div class="w-auto space-y-2 lg:w-1/2 lg:space-y-4">
		<div class="space-y-2 text-base sm:text-lg md:text-2xl">
			{@html data.home?.intro
				?.split('\n')
				.map((line) => `<p>${line}</p>`)
				.join('')}
		</div>
		<div class="hidden space-y-2 text-sm sm:block md:text-base lg:text-lg">
			{@html data.home?.missionStatement
				?.split('\n')
				.map((line) => `<p>${line}</p>`)
				.join('')}
		</div>
	</div>
</div>

<div class="px-4 py-6 sm:hidden">
	<div class="space-y-2 text-sm">
		{@html data.home?.missionStatement
			?.split('\n')
			.map((line) => `<p>${line}</p>`)
			.join('')}
	</div>
</div>

<div class="flex items-center justify-center p-24 pb-6">
	<h2 class="text-3xl lg:text-5xl">Services</h2>
</div>

<div class="p-4 md:space-y-12 lg:px-12">
	{#each data.home?.services as service, index (index)}
		<div class="grid grid-cols-1 items-center md:grid-cols-2 md:gap-x-12">
			<div class={['order-2 space-y-2 lg:space-y-4', index % 2 === 0 && 'md:order-1']}>
				<h3 class="text-lg/snug lg:text-3xl">{service.name}</h3>
				<div class="space-y-2 text-sm lg:text-xl">
					{@html service.description}
				</div>
				<p class="text-sm underline lg:text-xl">Learn more in the Library →</p>
			</div>
			<div class={['order-1', index % 2 === 0 && 'md:order-2']}>
				<img
					class="-my-12 ml-auto aspect-square w-1/2 opacity-60 mix-blend-darken md:my-auto md:w-auto md:opacity-80"
					src={imageUrl(service.image, { width: 1024, quality: 80, sharpen: 1 })}
					alt={service.image?.alt}
				/>
			</div>
		</div>
	{/each}
</div>

<div class="flex items-center justify-center p-24 pb-6">
	<h2 class="text-3xl lg:text-5xl">Contact</h2>
</div>

<div class="flex flex-wrap gap-6 p-4 md:flex-nowrap lg:gap-24 lg:px-24 xl:px-48">
	<div class="w-full space-y-4 text-lg lg:w-1/2 lg:space-y-8 lg:text-2xl">
		<p>
			If you’re ready to begin, or simply want to explore whether this is the right fit — I invite
			you to get in touch.
		</p>
		<p>
			<a href={`mailto:${data.settings?.email ?? ''}`}>{data.settings?.email ?? ''}</a>
			<br />{data.settings?.phoneNumber ?? ''}
		</p>
		<Button
			kind="pill"
			class="text-black!"
			href={data.settings?.onlineBookingUrl ?? ''}
			target="_blank">Schedule an appointment</Button
		>
	</div>

	<div class="w-full lg:w-1/2">
		<img class="aspect-square rounded-2xl object-cover" src="/images/24-DSC09564.jpg" />
	</div>
</div>
