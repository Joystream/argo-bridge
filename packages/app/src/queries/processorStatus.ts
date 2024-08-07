import { graphql } from '../gql'

export const getProcessorStatusDocument = graphql(/* GraphQL */ `
  query GetProcessorStatus {
    joyProcessorStatus {
      finalizedHeight
      height
    }
    baseProcessorStatus {
      finalizedHeight
      height
    }
  }
`)
