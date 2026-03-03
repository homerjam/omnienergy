<script lang="ts">
	import { onMount } from 'svelte';
	// import sampleSize from 'lodash-es/sampleSize';
	import { marked } from 'marked';
	// import { toHTML } from '@portabletext/to-html';
	import { imageUrl } from '$lib/helpers';
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import type { PageData } from './$types';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';
	import HlsVideo from '$lib/components/HlsVideo.svelte';
	import Stack from '$lib/components/Stack.svelte';

	let { data }: { data: PageData } = $props();

	let stack: Stack | undefined = $state(undefined);

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

	// $inspect(data);
</script>

<svelte:head>
	<title>{data.home?.seo?.title ?? 'Omni Energy Therapy'}</title>
	<meta name="description" content={data.home?.seo?.description ?? ''} />

	{#if data.home?.seo?.image}
		<meta
			property="og:image"
			content={imageUrl(data.home?.seo?.image, {
				height: 800,
				width: 1200,
				quality: 80,
				sharpen: 1,
			})}
		/>
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="800" />
		<meta property="og:title" content={data.home?.seo?.title ?? 'Omni Energy Therapy'} />
		<meta property="og:description" content={data.home?.seo?.description ?? ''} />
		<meta
			name="twitter:image"
			content={imageUrl(data.home?.seo?.image, {
				height: 800,
				width: 1200,
				quality: 80,
				sharpen: 1,
			})}
		/>
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:title" content={data.home?.seo?.title ?? 'Omni Energy Therapy'} />
		<meta name="twitter:description" content={data.home?.seo?.description ?? ''} />
	{/if}
</svelte:head>

<div class="absolute top-0 left-0 z-1 w-full">
	<Header isTop={true} class="text-white" />
</div>

<div class="relative z-0 flex h-[60vh] w-full flex-col overflow-hidden lg:h-[66vh]">
	<p
		class="relative z-2 mx-auto mt-auto w-full max-w-7xl px-4 py-6 type-heading text-white lg:px-12 lg:py-12 xl:px-12"
	>
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
	class={[
		'sticky top-0 z-2 -mt-px mb-12 w-full lg:mb-8',
		'border-b bg-off-white',
		// 'bg-linear-0 from-transparent via-off-white/10 via-[0.5rem] to-off-white to-[2rem]',
		'transition-opacity duration-75',
		headerVisible ? 'opacity-100' : 'lg:pointer-events-none lg:opacity-0',
	]}
	aria-hidden="true"
>
	<Header isSticky={true} />
</div>

<div class="flex justify-center gap-8 px-4 md:gap-12 lg:gap-12 lg:px-24 xl:gap-24 2xl:px-12">
	<div class="w-1/3 shrink-0 md:w-auto">
		<div class="sticky top-28 m-auto aspect-9/16 max-h-[50vw] sm:max-h-[50vw] lg:max-h-[75vh]">
			<!-- <img
				class="relative z-1 h-full w-full overflow-hidden rounded-2xl object-cover"
				src={imageUrl(data.home?.profileImage, { width: 1024, quality: 80, sharpen: 1 })}
				alt={data.home?.profileImage?.alt}
				loading="lazy"
			/> -->

			<div class="relative z-2 aspect-9/16 h-full w-80"></div>

			<div
				class="absolute inset-0 z-2 aspect-9/16 h-full w-full cursor-grab active:cursor-grabbing"
				style="--scale-step: 0.05; --brightness-step: 0.2;"
			>
				<Stack
					bind:this={stack}
					items={[{ image: data.home?.profileImage }, ...(data.home?.videos ?? [])]}
				>
					{#snippet children({ item: _item, index })}
						{@const item = _item as {
							index: number;
							image?: {
								asset: {
									_id: string;
									url: string;
								};
								crop?: {
									left: number;
									bottom: number;
									right: number;
									top: number;
								};
								hotspot?: {
									x: number;
									y: number;
								};
								alt: string;
							};
							video?: {
								asset: {
									playbackId: string;
								};
							};
						}}
						{#if item.image}
							<button
								class="relative cursor-pointer"
								onclick={() => {
									stack?.next();
								}}
							>
								<img
									class="pointer-events-none aspect-9/16 h-full w-full rounded-2xl object-cover"
									src={imageUrl(item.image, { width: 1024, quality: 80, sharpen: 1 })}
									alt={item.image?.alt}
									loading="lazy"
								/>

								<div class="absolute right-4 bottom-4 text-white">
									<span class="icon-[mingcute--play-fill] size-10"></span>
								</div>
							</button>
						{/if}
						{#if item.video}
							<HlsVideo
								class="h-full w-full rounded-2xl object-cover"
								src={`https://stream.mux.com/${item.video?.asset?.playbackId}.m3u8`}
								playsInline
								autoplay={index === 0}
								onended={() => {
									stack?.next();
								}}
								onclick={(event) => {
									const video = event.currentTarget as HTMLVideoElement;
									if (video.paused) {
										video.play();
									} else {
										video.pause();
									}
								}}
							/>
						{/if}
					{/snippet}
				</Stack>
			</div>
		</div>
	</div>

	<div class="flex w-1/2 max-w-lg flex-col gap-y-2 md:w-auto lg:gap-y-4">
		<div class="m-auto space-y-2 type-copy-large">
			{@html marked.parse(data.home?.intro ?? '')}
		</div>
		<div class="m-auto mt-0! hidden space-y-2 type-copy-default sm:block">
			{@html marked.parse(data.home?.missionStatement ?? '')}
		</div>
	</div>
</div>

<div class="px-4 pt-12 sm:hidden">
	<div class="space-y-2 type-copy-default">
		{@html marked.parse(data.home?.missionStatement ?? '')}
	</div>
</div>

<div id="services" class="flex items-center justify-center pt-32 pb-6">
	<h2 class="type-heading">Services</h2>
</div>

<div class="mx-auto max-w-7xl p-4 md:space-y-12 lg:px-12 xl:px-12">
	{#each data.home?.services as service, index (index)}
		<div class="grid grid-cols-1 items-center md:grid-cols-2 md:gap-x-12">
			<div class={['order-2 space-y-2 lg:space-y-4', index % 2 === 0 && 'md:order-1']}>
				<h3 class="type-title">{service.name}</h3>
				<div class="space-y-2 type-copy-small">
					{@html marked.parse(service.description ?? '')}
				</div>
				<p class="type-copy-default">
					<a href={resolve('/(frontend)/library/[slug]', { slug: service.article?.slug ?? '' })}
						>Learn more in the Library →</a
					>
				</p>
			</div>
			<div class={['order-1', index % 2 === 0 && 'md:order-2']}>
				<img
					class="-my-12 ml-auto aspect-square w-1/2 opacity-40 mix-blend-darken grayscale md:my-auto md:w-auto md:opacity-80"
					src={imageUrl(service.image, { width: 1024, quality: 80, sharpen: 1 })}
					alt={service.image?.alt}
					loading="lazy"
				/>
			</div>
		</div>
	{/each}
</div>

<div id="testimonials" class="flex items-center justify-center pt-32 pb-6">
	<h2 class="type-heading">Testimonials</h2>
</div>

<div class="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-6 md:px-24 lg:grid-cols-2">
	{#each (data.home?.testimonials ?? []).slice(0, 4) as testimonial, index (index)}
		<span class={[index >= 2 && 'hidden lg:block']}>
			<Testimonial {testimonial} />
		</span>
	{/each}
</div>

<div id="contact" class="flex items-center justify-center pt-32 pb-6">
	<h2 class="type-heading">Contact</h2>
</div>

<div class="mx-auto flex max-w-7xl gap-6 p-4 lg:gap-24 lg:px-24 xl:px-12">
	<div class="w-3/5 space-y-4 type-copy-large lg:w-1/2 lg:space-y-8">
		<div>
			{@html marked.parse(data.home?.contact ?? '')}
		</div>
		<div class="hidden flex-col gap-4 lg:flex">
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
	</div>

	<div class="w-2/5 lg:w-1/2">
		<img
			class="aspect-square rounded-2xl object-cover"
			src={imageUrl(data.home?.contactImage, {
				width: 1024,
				height: 1024,
				quality: 80,
				sharpen: 1,
			})}
			alt={data.home?.contactImage?.alt}
			loading="lazy"
		/>
	</div>
</div>

<div class="flex flex-col gap-4 px-4 pt-4 lg:hidden" aria-hidden="true">
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

<div id="experience" class="flex items-center justify-center pt-32 pb-6">
	<h2 class="type-heading">Qualifications & Experience</h2>
</div>

<div class="mx-auto flex max-w-7xl gap-6 px-4 pt-6 lg:gap-12 lg:px-24 2xl:px-12">
	<div class="w-auto space-y-4 lg:w-1/2 lg:space-y-8">
		<div class="space-y-2 type-copy-small">
			{@html marked.parse(data.home?.experience ?? '')}
		</div>

		<div class="relative hidden space-y-2 type-copy-small lg:block">
			{#each data.home?.qualifications as qualification, index (index)}
				<p>
					{qualification.title}
					{#if qualification.details}
						<br />
						({qualification.details})
					{/if}
				</p>
			{/each}

			<div class="absolute right-4 -bottom-4 md:right-16">
				<img
					class="aspect-square w-32 opacity-40 mix-blend-darken grayscale"
					src="/images/omnienergy-qualifications.png"
					alt="Qualifications"
				/>
			</div>
		</div>
	</div>

	<div class="w-auto shrink-0 pb-4 lg:w-1/2">
		<img
			class="sticky top-28 m-auto max-h-[50vw] rounded-2xl sm:max-h-[50vw] lg:max-h-[75vh]"
			src={imageUrl(data.home?.qualificationsImage, { width: 1024, quality: 80, sharpen: 1 })}
			alt={data.home?.qualificationsImage?.alt}
			loading="lazy"
		/>
	</div>
</div>

<div class="flex px-4 lg:hidden" aria-hidden="true">
	<div class="relative space-y-2 type-copy-small">
		{#each data.home?.qualifications as qualification, index (index)}
			<p>
				{qualification.title}
				{#if qualification.details}
					<br />
					({qualification.details})
				{/if}
			</p>
		{/each}

		<div class="absolute right-4 -bottom-4 md:right-16">
			<img
				class="aspect-square w-32 opacity-40 mix-blend-darken grayscale"
				src="/images/omnienergy-qualifications.png"
				alt="Qualifications"
			/>
		</div>
	</div>
</div>

<div id="library" class="flex items-center justify-center pt-32 pb-6">
	<h2 class="type-heading">
		Find out more in the <a href="/library" class="underline">library</a>
	</h2>
</div>

<Footer />
