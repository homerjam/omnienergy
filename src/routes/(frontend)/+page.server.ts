import groq from 'groq';
import { assetFragment, sanityClient, type HomeQueryResult } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { shuffle } from 'lodash-es';

export const load = (async ({ locals }) => {
	const homeQuery = groq`*[_type == "home"][0] {
		tagline,
		coverImage {
			asset->{
				${assetFragment}
			},
			crop,
			hotspot,
			alt,
		},
		intro,
		missionStatement,
		profileImage {
			asset->{
				${assetFragment}
			},
			crop,
			hotspot,
			alt,
		},
		videos[] {
			title,
			video {
				asset->{
					${assetFragment}
				},
			},
		},
		services[] {
			name,
			description,
			image {
				asset->{
					${assetFragment}
				},
				crop,
				hotspot,
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
					crop,
					hotspot,
					alt,
				},
			},
		},
		contact,
		contactImage {
			asset->{
				${assetFragment}
			},
			crop,
			hotspot,
			alt,
		},
		testimonials[] {
			_key,
			source,
			text,
			date,
			rating,
			author,
			originalUrl,
		},
		qualificationsImage {
			asset->{
				${assetFragment}
			},
			crop,
			hotspot,
			alt,
		},
		qualifications[] {
			title,
			details,
		},
		experience,
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

	const home = await sanityClient.fetch<HomeQueryResult>(homeQuery, {
		...locals,
	});

	if (home) {
		home.testimonials = shuffle(home.testimonials ?? []);
	}

	return {
		home,
	};
}) satisfies PageServerLoad;
