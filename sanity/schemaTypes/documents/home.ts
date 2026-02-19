import {ComposeIcon, SearchIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
      icon: ComposeIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: SearchIcon,
    },
  ],
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 12,
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({type: 'service'})],
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
