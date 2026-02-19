import {
	createImageUrlBuilder,
	type ImageUrlBuilderOptions,
	type SanityImageCrop,
	type SanityImageHotspot,
} from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
	projectId: 'zjpuxi7o',
	dataset: 'production',
});

export const imageUrl = (
	imageReferenceOrField:
		| string
		| {
				asset?: { _id: string } | null;
				crop?: { left?: number; bottom?: number; right?: number; top?: number } | null;
				hotspot?: { x?: number; y?: number; height?: number; width?: number } | null;
		  }
		| null
		| undefined,
	options: ImageUrlBuilderOptions = {}
) => {
	if (!imageReferenceOrField) return '';

	const image = imageBuilder.image(imageReferenceOrField);

	return image.withOptions(options).auto('format').url();
};
