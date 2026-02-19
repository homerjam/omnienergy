import {defineField, defineType} from 'sanity'

export const embed = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'URL for iframe embed (e.g. YouTube, Vimeo, or any embeddable page)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {url: 'url'},
    prepare({url}) {
      let subtitle: string | undefined
      try {
        subtitle = url ? new URL(url).hostname : undefined
      } catch {
        subtitle = undefined
      }
      return {
        title: url || 'Embed',
        subtitle,
      }
    },
  },
})
