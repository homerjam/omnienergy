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

		const transformTween = new Tween(
			{
				x,
				y,
				rotate,
				scale: 1,
				brightness: 1,
			},
			{ easing: expoOut, duration: 0 }
		);

		tweenMap?.set(key, transformTween);

		const transformTweenStore = toStore(() => transformTween.current);

		const positionCompartment = Object.assign(
			Compartment.of(() => {
				return position({ current: $state.snapshot(transformTween.current) });
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

			await transformTween.set(
				{
					...transformTween.current,
					// x: transformTween.current.x * 1.1,
					// y: transformTween.current.y * 1.1,
					x: transformTween.current.x + velocity.x * transformTween.current.x,
					y: transformTween.current.y + velocity.x * transformTween.current.y,
				},
				{ duration: SNAP_BACK_DURATION * 0.25, easing: quadOut }
			);

			await transformTween.set(
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
				transformTween.set(
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
			threshold({ distance: 8, delay: 100 }),
			events({
				onDragStart({ event, offset }) {
					isDragging = true;

					onDragStart?.();

					dragStart = { x: 0, y: 0 };
					pointerStart = { x: event.x, y: event.y };
					pointer = { x: event.x, y: event.y };
					time = performance.now();
					velocity = { x: 0, y: 0 };

					transformTween.set({
						...transformTween.current,
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

					if (pointerStart.x === 0 && pointerStart.y === 0) {
						pointerStart = { x: event.x, y: event.y };
					}

					velocity = {
						x: Math.max(0, Math.min(Math.abs(delta.x / deltaTime), 0.3)),
						y: Math.max(0, Math.min(Math.abs(delta.y / deltaTime), 0.3)),
					};

					const drag = {
						x: event.x - pointerStart.x - dragStart.x,
						y: event.y - pointerStart.y - dragStart.y,
					};

					transformTween.set(
						{
							...transformTween.current,
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

					if (transformTween.current.x === 0 && transformTween.current.y === 0) {
						return;
					}

					if (
						Math.abs(transformTween.current.x) < SNAP_BACK_THRESHOLD &&
						Math.abs(transformTween.current.y) < SNAP_BACK_THRESHOLD
					) {
						transformTween.set(
							{
								...transformTween.current,
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

		const unsubscribeTransform = transformTweenStore.subscribe(
			({ x, y, rotate, scale, brightness }) => {
				el.style.translate = `${x}px ${y}px`;
				el.style.rotate = `${rotate}deg`;
				el.style.scale = `${scale}`;
				el.style.filter = `brightness(${brightness})`;
			}
		);

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
