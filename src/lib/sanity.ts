import { createClient } from '@sanity/client';
// import { SANITY_TOKEN } from '$env/static/private';
export * from '../../sanity/sanity.types';

export const sanityClient = createClient({
	projectId: 'zjpuxi7o',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2026-01-28',
	// token: SANITY_TOKEN,
});

export const assetFragment = /* groq */ `
    _id,
    _type,
    assetId,
    _type == "sanity.fileAsset" => {
        extension,
        mimeType,
        url,
        originalFilename,
    },
    _type == "sanity.imageAsset" => {
        extension,
        mimeType,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
        "aspectRatio": metadata.dimensions.aspectRatio,
        "blurHash": metadata.blurHash,
    },
    _type == "mux.videoAsset" => {
        playbackId,
        "width": coalesce(data.tracks[0].max_width, data.tracks[1].max_width),
        "height": coalesce(data.tracks[0].max_height, data.tracks[1].max_height),
        "aspectRatio": coalesce(data.tracks[0].max_width / data.tracks[0].max_height, data.tracks[1].max_width / data.tracks[1].max_height),
        "duration": data.duration,
    }
`;
