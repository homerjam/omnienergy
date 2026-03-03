<script lang="ts">
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
