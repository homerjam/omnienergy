import {resolve} from 'path'
import {defineCliConfig} from 'sanity/cli'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineCliConfig({
  api: {
    projectId: 'zjpuxi7o',
    dataset: 'production',
  },

  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },

  typegen: {
    path: '../src/**/*.{ts,tsx,js,jsx}', // glob pattern to your typescript files. Can also be an array of paths
    schema: './schema.json', // path to your schema file, generated with 'sanity schema extract' command
    generates: './sanity.types.ts', // path to the output file for generated type definitions
    overloadClientMethods: true, // set to false to disable automatic overloading the sanity client
  },

  vite: {
    plugins: [tsconfigPaths()],

    resolve: {
      alias: {
        $lib: resolve(__dirname, '..', 'src', 'lib'),
      },
    },
  },
})
