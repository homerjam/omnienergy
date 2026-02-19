import groq from 'groq';
import { assetFragment, sanityClient, type TermsAndConditionsQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const termsAndConditionsQuery = groq`*[_type == "termsAndConditions"][0] {
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

	const page = await sanityClient.fetch<TermsAndConditionsQueryResult>(termsAndConditionsQuery, {
		...locals,
	});

	return { page };
}) satisfies PageServerLoad;
