import {defineField} from 'sanity'

export const seo = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  group: 'seo',
  options: {
    // collapsed: true,
    // collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      // type: 'internationalizedArrayString',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      // type: 'internationalizedArrayText',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
