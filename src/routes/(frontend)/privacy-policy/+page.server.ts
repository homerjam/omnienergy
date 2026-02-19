import groq from 'groq';
import { assetFragment, sanityClient, type PrivacyPolicyQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const privacyPolicyQuery = groq`*[_type == "privacyPolicy"][0] {
		title,
		lastUpdated,
		seo,
		"content": content[] {
			...,
			_type == "image" => {
				...,
				asset->{
					${assetFragment}
				},
			},
		},
	}`;

	const page = await sanityClient.fetch<PrivacyPolicyQueryResult>(privacyPolicyQuery, {
		...locals,
	});

	return { page };
}) satisfies PageServerLoad;
