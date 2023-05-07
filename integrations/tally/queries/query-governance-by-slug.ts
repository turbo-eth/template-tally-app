import { gql, useQuery } from 'urql'

export const queryGovernanceBySlug = gql`
  query GovernanceBySlug($slug: String!) {
    governanceBySlug(slug: $slug) {
      name
      chainId
      organization {
        description
        visual {
          icon
        }
      }
      stats {
        proposals {
          passed
          failed
          total
          active
        }
        tokens {
          voters
          owners
        }
      }
      proposals(sort: { field: START_BLOCK, order: DESC }) {
        id
        title
        description
        voteStats {
          percent
          support
          weight
        }
        statusChanges {
          type
        }
        start {
          timestamp
        }
      }
    }
  }
`

export const useQueryGovernancesBySlug = (variables: { slug: string }) => {
  const [result] = useQuery({
    query: queryGovernanceBySlug,
    variables,
  })
  const { data, fetching, error } = result
  return { data, fetching, error }
}
