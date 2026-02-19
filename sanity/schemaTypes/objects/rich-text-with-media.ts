import {defineArrayMember, defineField} from 'sanity'

export const richTextWithMedia = defineField({
  name: 'richTextWithMedia',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Italic', value: 'em'},
          {title: 'Strong', value: 'strong'},
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    // defineArrayMember({
    //   type: 'file',
    //   name: 'video',
    //   title: 'Video',
    //   options: {
    //     accept: 'video/*',
    //   },
    //   fields: [
    //     {
    //       name: 'caption',
    //       type: 'string',
    //       title: 'Caption',
    //     },
    //   ],
    // }),
    defineArrayMember({
      type: 'embed',
    }),
  ],
})
