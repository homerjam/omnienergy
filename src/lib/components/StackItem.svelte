<script lang="ts">
	import { type Snippet } from 'svelte';
	import { expoOut, quadInOut, quadOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { toStore } from 'svelte/store';
	import type { Attachment } from 'svelte/attachments';
	import { Compartment, draggable, events, position, transform, threshold } from '@neodrag/svelte';

	const SNAP_BACK_DURATION = 500;
	const SNAP_BACK_THRESHOLD = 150;

	let {
		item,
		index,
		transformMap,
		tweenMap,
		onDismissStart,
		onDismissEnd,
		onDragStart,
		onDragEnd,
		children,
	}: {
		item: unknown;
		index: number;
		transformMap?: Map<unknown, { x: number; y: number; rotate: number }>;
		tweenMap?: Map<
			unknown,
			Tween<{
				x: number;
				y: number;
				rotate: number;
				scale: number;
				brightness: number;
			}>
		>;
		onDismissStart?: ({ index, item }: { index: number; item: unknown }) => void;
		onDismissEnd?: () => void;
		onDragStart?: () => void;
		onDragEnd?: () => void;
		children: Snippet<[{ item: unknown; index: number }]>;
	} = $props();

	let isDragging = $state(false);
	let isDismissing = $state(false);

	export const actions: {
		dismiss?: () => Promise<void>;
	} = {};

	const attachment: Attachment = (element) => {
		const el = element as HTMLElement;

		const key = (item as { id: unknown }).id || item;

		const x = transformMap?.get(key)?.x || 0;
		const y = transformMap?.get(key)?.y || 0;
		const rotate = transformMap?.get(key)?.rotate || 0;

		const tween = new Tween(
			{
				x,
				y,
				rotate,
				scale: 1,
				brightness: 1,
			},
			{ easing: expoOut, duration: 0 }
		);

		tweenMap?.set(key, tween);

		const tweenStore = toStore(() => tween.current);

		const positionCompartment = Object.assign(
			Compartment.of(() => {
				return position({ current: $state.snapshot(tween.current) });
			}),
			{ name: 'position' }
		);

		let dragStart = {
			x: 0,
			y: 0,
		};
		let pointerStart = {
			x: 0,
			y: 0,
		};
		let pointer = {
			x: 0,
			y: 0,
		};
		let time = 0;
		let velocity = {
			x: 0,
			y: 0,
		};

		async function dismiss() {
			isDismissing = true;

			onDismissStart?.({ index, item });

			await tween.set(
				{
					...tween.current,
					// x: tween.current.x * 1.1,
					// y: tween.current.y * 1.1,
					x: tween.current.x + velocity.x * tween.current.x,
					y: tween.current.y + velocity.x * tween.current.y,
				},
				{ duration: SNAP_BACK_DURATION * 0.25, easing: quadOut }
			);

			await tween.set(
				{
					x,
					y,
					rotate,
					scale: 0.5,
					brightness: 0.5,
				},
				{ duration: SNAP_BACK_DURATION, easing: quadInOut }
			);

			isDismissing = false;

			onDismissEnd?.();

			setTimeout(() => {
				tween.set(
					{
						x,
						y,
						rotate,
						scale: 1,
						brightness: 1,
					},
					{ duration: 500 }
				);
			}, 500);
		}

		actions.dismiss = dismiss;

		const draggableAttachment = draggable([
			positionCompartment,
			threshold({ distance: 1, delay: 1 }),
			events({
				onDragStart({ event, offset }) {
					isDragging = true;

					onDragStart?.();

					dragStart = { x: 0, y: 0 };
					pointerStart = { x: event.x, y: event.y };
					pointer = { x: event.x, y: event.y };
					time = performance.now();
					velocity = { x: 0, y: 0 };

					tween.set({
						...tween.current,
						x: offset.x,
						y: offset.y,
						scale: 1,
						brightness: 1,
					});
				},
				onDrag({ event }) {
					const now = performance.now();

					const deltaTime = now - time;
					const delta = { x: event.x - pointer.x, y: event.y - pointer.y };

					time = now;
					pointer = { x: event.x, y: event.y };

					velocity = {
						x: Math.max(0, Math.min(Math.abs(delta.x / deltaTime), 0.3)),
						y: Math.max(0, Math.min(Math.abs(delta.y / deltaTime), 0.3)),
					};

					const drag = {
						x: pointer.x - (pointerStart.x || pointer.x) - dragStart.x,
						y: pointer.y - (pointerStart.y || pointer.y) - dragStart.y,
					};

					tween.set(
						{
							...tween.current,
							x: drag.x,
							y: drag.y,
							rotate: drag.x * 0.05,
						},
						{ duration: 0 }
					);
				},
				async onDragEnd() {
					isDragging = false;

					onDragEnd?.();

					if (tween.current.x === 0 && tween.current.y === 0) {
						return;
					}

					if (
						Math.abs(tween.current.x) < SNAP_BACK_THRESHOLD &&
						Math.abs(tween.current.y) < SNAP_BACK_THRESHOLD
					) {
						tween.set(
							{
								...tween.current,
								x,
								y,
								rotate,
							},
							{ duration: SNAP_BACK_DURATION * 0.5 }
						);

						return;
					}

					dismiss();
				},
			}),
			transform(() => {}),
		]);

		const unsubscribeTransform = tweenStore.subscribe(({ x, y, rotate, scale, brightness }) => {
			el.style.translate = `${x}px ${y}px`;
			el.style.rotate = `${rotate}deg`;
			el.style.scale = `${scale}`;
			el.style.filter = `brightness(${brightness})`;
		});

		const destroy = draggableAttachment(el) as () => void;

		return () => {
			unsubscribeTransform();
			destroy();
		};
	};
</script>

<div
	class={[
		'pointer-events-auto absolute inset-0 m-auto origin-center',
		isDragging ? 'z-1000' : 'z-[calc(999-var(--index))]',
	]}
	style:--index={index}
	{@attach attachment}
>
	<div
		class={[
			!isDismissing &&
				'scale-[calc(1-(var(--index)*var(--scale-step)))] brightness-[calc(1-(var(--index)*var(--brightness-step)))]',
			'ease-in-out-expo origin-center transition-all duration-500',
		]}
	>
		{@render children({ item, index })}
	</div>
</div>
