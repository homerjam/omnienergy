<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';

	let {
		src,
		class: className,
		oncanplay,
		...restProps
	}: {
		src: string;
		class?: string | Array<string | boolean>;
		onclick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLVideoElement }) => void;
		oncanplay?: (event: Event & { currentTarget: EventTarget & HTMLVideoElement }) => void;
	} & Partial<
		Pick<
			HTMLVideoElement,
			| 'autoplay'
			| 'controls'
			| 'muted'
			| 'loop'
			| 'playsInline'
			| 'onclick'
			| 'onended'
			| 'onloadedmetadata'
			| 'oncanplay'
		>
	> = $props();

	let video: HTMLVideoElement;
	let intersectionObserver: IntersectionObserver | null = null;

	$effect(() => {
		if (!video) return;

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
		}
	});

	$effect(() => {
		if (restProps.autoplay) {
			video.play();
		} else {
			video.pause();
		}
	});

	onMount(() => {
		if (!video || typeof IntersectionObserver === 'undefined') return;

		intersectionObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.target === video && !entry.isIntersecting) {
						video.pause();
					}
				}
			},
			{
				threshold: 0.1,
			}
		);

		intersectionObserver.observe(video);

		return () => {
			intersectionObserver?.disconnect();
			intersectionObserver = null;
		};
	});
</script>

<!-- <svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
</svelte:head> -->

<video
	bind:this={video}
	class={className}
	oncanplay={(event) => {
		if (event.currentTarget.autoplay) {
			event.currentTarget.muted = event.currentTarget.muted;
			event.currentTarget.play();
		}

		oncanplay?.(event);
	}}
	{...restProps}
>
	<track kind="captions" />
</video>
