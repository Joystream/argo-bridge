import type { CodegenConfig } from '@graphql-codegen/cli'
import { ARGO_INDEXER_URL } from './src/config'

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
