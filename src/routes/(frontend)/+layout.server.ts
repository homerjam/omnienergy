import groq from 'groq';
import { sanityClient, type SettingsQueryResult } from '$lib/sanity';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const settingsQuery = groq`*[_type == "settings"][0] {
		email,
		phoneNumber,
		onlineBookingUrl,
		instagramUrl,
		facebookUrl,
		linkedinUrl,
	}`;

	const settings = await sanityClient.fetch<SettingsQueryResult>(settingsQuery, {
		...locals,
	});

	return {
		settings,
	};
}) satisfies LayoutServerLoad;
