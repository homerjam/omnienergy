import { toHTML } from '@portabletext/to-html';
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

const escapeHtml = (str: string) =>
	str
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

export const portableTextToHtml = (
	blocks: import('@portabletext/types').PortableTextBlock[] | null | undefined,
	options?: { imageWidth?: number; imageQuality?: number }
) => {
	if (!blocks?.length) return '';
	const { imageWidth = 1200, imageQuality = 80 } = options ?? {};
	return toHTML(blocks as import('@portabletext/types').TypedObject[], {
		components: {
			types: {
				image: ({ value }) => {
					const url = imageUrl(value, {
						width: imageWidth,
						quality: imageQuality,
						sharpen: 1,
					});
					const alt = escapeHtml(value?.alt ?? '');
					const caption = value?.caption ? escapeHtml(value.caption) : '';
					if (caption) {
						return `<figure><img src="${url}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
					}
					return `<img src="${url}" alt="${alt}" loading="lazy" />`;
				},
			},
		},
	});
};
