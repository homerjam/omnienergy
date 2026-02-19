import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'Google',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      options: {
        list: [
          {title: '5', value: 5},
          {title: '4', value: 4},
          {title: '3', value: 3},
          {title: '2', value: 2},
          {title: '1', value: 1},
        ],
        layout: 'dropdown',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'originalUrl',
      title: 'Original URL',
      type: 'url',
      description: 'Link to the original review (e.g. Google)',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      author: 'author',
      rating: 'rating',
    },
    prepare({text, author, rating}) {
      const snippet = text ? text.slice(0, 40) + (text.length > 40 ? '…' : '') : 'No text'
      return {
        title: author || 'Untitled',
        subtitle: `${snippet}${rating ? ` · ${rating}/5` : ''}`,
        media: StarIcon,
      }
    },
  },
})
