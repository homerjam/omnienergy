import { error } from '@sveltejs/kit';
import groq from 'groq';
import { assetFragment, sanityClient, type ArticleQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const articleQuery = groq`*[_type == "article" && slug.current == $slug][0] {
		title,
		date,
		coverImage {
			asset->{
				${assetFragment}
			},
			crop,
			hotspot,
			alt,
		},
		"text": text[] {
			...,
			_type == "image" => {
				...,
				asset->{
					${assetFragment}
				},
				crop,
				hotspot,
				alt
			},
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

	const article = await sanityClient.fetch<ArticleQueryResult>(articleQuery, {
		slug: params.slug,
		...locals,
	});

	if (!article) {
		throw error(404, 'Article not found');
	}

	return { article };
}) satisfies PageServerLoad;
