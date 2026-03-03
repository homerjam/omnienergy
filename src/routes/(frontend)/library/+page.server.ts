import groq from 'groq';
import { assetFragment, sanityClient, type LibraryQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const libraryQuery = groq`*[_type == "article"] {
		title,
		"slug": slug.current,
		date,
		coverImage {
			asset->{
				${assetFragment}
			},
			crop,
			hotspot,
			alt,
		},
		seo {
			title,
			description,
			image {
				asset->{
					${assetFragment}
				},
				crop,
				hotspot,
			},
		},
	}`;

	const library = await sanityClient.fetch<LibraryQueryResult>(libraryQuery, {
		...locals,
	});

	return { library };
}) satisfies PageServerLoad;
