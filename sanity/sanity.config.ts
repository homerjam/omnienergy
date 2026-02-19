import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Omni Energy',

  projectId: 'zjpuxi7o',
  dataset: 'production',

  basePath: '/admin',

  plugins: [
    structureTool({structure}),
    // internationalizedArray({
    //   languages: [{id: 'en', title: 'English'}],
    //   defaultLanguages: ['en'],
    //   fieldTypes: ['string', 'text', 'richText'],
    // }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
