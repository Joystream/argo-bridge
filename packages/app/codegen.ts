import { ARGO_INDEXER_URL } from './src/config'
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: ARGO_INDEXER_URL,
  documents: 'src/queries/*.ts',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          DateTime: 'string',
          BigInt: 'string',
        },
      },
    },
  },
}

export default config
