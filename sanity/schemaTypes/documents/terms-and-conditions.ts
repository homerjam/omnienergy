import {ComposeIcon, LockIcon, SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const termsAndConditions = defineType({
  name: 'termsAndConditions',
  title: 'Terms & Conditions',
  type: 'document',
  icon: LockIcon,
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
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Terms & Conditions',
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richTextWithMedia',
      validation: (rule) => rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
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
        title: 'Terms & Conditions',
      }
    },
  },
})
