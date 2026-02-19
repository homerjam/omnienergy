import {defineField, defineType} from 'sanity'
import {VideoIcon} from '@sanity/icons'

export const muxVideo = defineType({
  name: 'muxVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title ?? 'Untitled video',
        media: VideoIcon,
      }
    },
  },
})
