<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Omni Energy Therapy</title>
	<!-- <meta name="description" content="Omni Energy Therapy" /> -->
	<!-- <meta name="keywords" content="Omni Energy Therapy" /> -->
	<!-- <meta name="author" content="Omni Energy Therapy" /> -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<!-- <meta name="google" content="notranslate" /> -->
	<link rel="icon" href={favicon} />

	<!-- <link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
		rel="stylesheet"
	/> -->
</svelte:head>

{@render children()}
