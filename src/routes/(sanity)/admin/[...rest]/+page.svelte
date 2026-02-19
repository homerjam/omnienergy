<script lang="ts">
	import { onMount } from 'svelte';
	import { renderStudio, type Config } from 'sanity';

	onMount(async () => {
		const config: Config = (await import('@/sanity/sanity.config')).default;

		try {
			const user = await (
				await fetch(
					`https://${config.projectId}.api.sanity.io/v2025-02-25/users/me?tag=sanity.studio.users.get-current`,
					{
						credentials: 'include',
					}
				)
			).json();

			console.log({ user });

			if (user.id) {
				document.cookie = `sanity_project_id=${config.projectId}; Path=/; Max-Age=3600; SameSite=Lax;`;
			} else {
				document.cookie = `api_token=; Path=/; Max-Age=0; SameSite=Lax;`;
				document.cookie = `sanity_project_id=; Path=/; Max-Age=0; SameSite=Lax;`;
			}
		} catch (error) {
			console.error(error);
		}

		window.addEventListener('beforeunload', () => {
			document.cookie = `api_token=; Path=/; Max-Age=0; SameSite=Lax;`;
			document.cookie = `sanity_project_id=; Path=/; Max-Age=0; SameSite=Lax;`;
		});

		renderStudio(document.getElementById('app'), config);
	});
</script>

<div id="app"></div>

<style>
	:global(html) {
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
		-webkit-tap-highlight-color: transparent;
		-webkit-font-smoothing: antialiased;
	}
	:global(body) {
		background-color: #000;
	}
	:global(html),
	:global(body),
	#app {
		height: 100%;
		margin: 0;
		overflow: hidden;
	}
</style>
