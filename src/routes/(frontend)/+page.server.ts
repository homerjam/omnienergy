import groq from 'groq';
import { assetFragment, sanityClient, type HomeQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {};

	const homeQuery = groq`*[_type == "home"][0] {
		"text": "Hello, world!"
	}`;

	const home = await sanityClient.fetch<HomeQueryResult>(homeQuery, {
		...locals,
	});

	return {
		home,
	};
}) satisfies PageServerLoad;
