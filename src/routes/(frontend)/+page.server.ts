import groq from 'groq';
import { assetFragment, sanityClient, type HomeQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const homeQuery = groq`*[_type == "home"][0] {
		tagline,
		coverImage {
			asset->{
				${assetFragment}
			},
			alt,
		},
		intro,
		missionStatement,
		profileImage {
			asset->{
				${assetFragment}
			},
			alt,
		},
		services[] {
			name,
			description,
			image {
				asset->{
					${assetFragment}
				},
				alt,
			},
			article->{
				title,
				"slug": slug.current,
				date,
				coverImage {
					asset->{
						${assetFragment}
					},
					alt,
				},
			},
		},
		seo,
	}`;

	const home = await sanityClient.fetch<HomeQueryResult>(homeQuery, {
		...locals,
	});

	return {
		home,
	};
}) satisfies PageServerLoad;
