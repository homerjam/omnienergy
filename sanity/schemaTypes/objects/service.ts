import {defineField, defineType} from 'sanity'
import {BillIcon} from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{type: 'article'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      description: 'description',
    },
    prepare({name, description}) {
      return {
        title: name,
        // subtitle: description,
        media: BillIcon,
      }
    },
  },
})
