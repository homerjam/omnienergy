<script lang="ts">
	import { toHTML } from '@portabletext/to-html';
	import { imageUrl } from '$lib/helpers';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';

	let { data }: { data: PageData } = $props();

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

<div
	class="sticky top-0 z-2 w-full bg-linear-0 from-transparent via-off-white/10 via-[0.5rem] to-off-white to-[2rem]"
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
			src="/images/6-DSC09398.jpg"
		/>
	</div>

	<div class="w-auto space-y-2 lg:w-1/2 lg:space-y-4">
		<p class="text-base sm:text-lg md:text-2xl">Hi, I’m Eloisa,</p>
		<!-- <p class="text-base sm:text-lg md:text-2xl">Welcome to Omni Energy Therapy.</p> -->
		<p class="text-base sm:text-lg md:text-2xl">
			My work is grounded in a simple belief: When you understand your inner world, you gain the
			power to change your outer world.
		</p>
		<span class="hidden space-y-2 text-sm sm:block md:text-base lg:text-lg">
			<p>
				<!-- <span>Welcome to Omni Energy Therapy.</span> -->
				If you’re feeling emotionally drained, easily triggered, experiencing repeating negative patterns
				within your relationships, or feeling as though you need to come back to your true self, you have
				landed in the right place. I am here to help you make sense of your emotional landscape, while
				you develop the skills and insight needed to navigate life with greater stability and confidence.
			</p>
			<p>
				My approach is explorative and outcome-focused. Each intervention I use is supported by
				evidence-based research and guided by your personal goals, allowing the therapeutic process
				to move beyond self-awareness into real, sustainable behavioural change.
			</p>
			<p>
				I look forward to meeting and supporting you on this incredible journey that you are about
				to embark on.
			</p>
		</span>
	</div>
</div>

<div class="px-4 py-6 sm:hidden">
	<div class="space-y-2 text-sm">
		<p>
			<!-- <span>Welcome to Omni Energy Therapy.</span> -->
			If you’re feeling emotionally drained, easily triggered, experiencing repeating negative patterns
			within your relationships, or feeling as though you need to come back to your true self, you have
			landed in the right place. I am here to help you make sense of your emotional landscape, while you
			develop the skills and insight needed to navigate life with greater stability and confidence.
		</p>
		<p>
			My approach is explorative and outcome-focused. Each intervention I use is supported by
			evidence-based research and guided by your personal goals, allowing the therapeutic process to
			move beyond self-awareness into real, sustainable behavioural change.
		</p>
		<p>
			I look forward to meeting and supporting you on this incredible journey that you are about to
			embark on.
		</p>
	</div>
</div>

<div class="flex items-center justify-center p-12 pb-0! lg:p-24">
	<h2 class="text-3xl lg:text-5xl">Services</h2>
</div>

<div class="grid grid-cols-1 items-center p-4 lg:grid-cols-2 lg:gap-x-12 lg:px-12">
	<div class="order-1 space-y-2 lg:space-y-4">
		<h3 class="text-lg/snug lg:text-3xl">Eye Movement Desensitisation and Reprocessing (EMDR)</h3>
		<div class="space-y-2 text-sm lg:text-xl">
			<p>
				I chose to incorporate this powerful therapy into my practice because it accesses deep,
				subconscious trauma and supports the transformation of negative core beliefs into more
				adaptive, empowering ones. This approach supports individuals who have experienced a wide
				range of traumatic or distressing life events, including childhood trauma, grief and loss,
				and other adverse experiences. It can also be an effective therapy for processing emotional
				challenges surrounding body dysmorphia, low self-worth and self-esteem issues, which can
				lead to anxiety, and deeply ingrained emotional and behavioural patterns.
			</p>
		</div>
		<p class="text-sm underline lg:text-xl">Learn more in the Library →</p>
	</div>
	<div class="order-2">
		<img class="ml-auto aspect-square w-1/2 outline-1 lg:w-auto" />
	</div>

	<div class="order-3 space-y-2 lg:space-y-4">
		<h3 class="text-lg lg:text-3xl">Dialectical Behaviour Therapy (DBT)</h3>
		<div class="space-y-2 text-sm lg:text-xl">
			<p>
				I am a passionate advocate for DBT, having witnessed the profound ways it has helped my
				clients emotionally grow, heal, and thrive. DBT can support a wide range of challenges,
				including addiction, self-critical patterns, relationship difficulties, self-harm, and other
				self-destructive behaviours.
			</p>
			<p>
				When understood and applied, DBT has the power to transform your life. It not only helps
				improve your relationships with others but, most importantly, strengthens your relationship
				with yourself. DBT is a structured, skills-based therapy designed to help you regulate
				emotions, tolerate distress, and build healthier connections. I work with you to develop
				practical tools that foster emotional balance, resilience, and more intentional responses to
				life’s challenges.
			</p>
		</div>
		<p class="text-sm underline lg:text-xl">Learn more in the Library →</p>
	</div>
	<div class="order-4 lg:order-2">
		<img class="ml-auto aspect-square w-1/2 outline-1 lg:w-auto" />
	</div>
</div>

<div class="flex items-center justify-center p-24 pb-0">
	<h2 class="text-3xl lg:text-5xl">Contact</h2>
</div>

<div class="flex flex-wrap gap-6 p-4 lg:flex-nowrap lg:gap-24 lg:p-24 xl:px-48">
	<div class="w-full space-y-4 text-lg lg:w-1/2 lg:space-y-8 lg:text-2xl">
		<p>
			If you’re ready to begin, or simply want to explore whether this is the right fit — I invite
			you to get in touch.
		</p>
		<p>
			<a href="mailto:eloisa@omnienergytherapy.com">eloisa@omnienergytherapy.com</a><br />+61 (0)412
			240 540
		</p>
		<Button kind="pill" class="text-black!">Schedule an appointment</Button>
	</div>

	<div class="w-full lg:w-1/2">
		<img class="aspect-square rounded-2xl object-cover" src="/images/24-DSC09564.jpg" />
	</div>
</div>
