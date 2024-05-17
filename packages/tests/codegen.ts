import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4350/graphql",
  documents: "src/queries/*.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
          DateTime: "string",
          BigInt: "string",
        },
      },
    },
  },
}

export default config
