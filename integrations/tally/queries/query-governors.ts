import { gql, useQuery } from 'urql'

export const queryGovernors = gql`
  query Governors($chainIds: [ChainID!], $pagination: Pagination, $sort: GovernorSort) {
    governors(chainIds: $chainIds, pagination: $pagination, sort: $sort) {
      id
      name
      tokens {
        stats {
          voters
        }
      }
      proposalStats {
        total
        active
      }
    }
  }
`

export const useQueryGovernors = (variables: any) => {
  const [result] = useQuery({
    query: queryGovernors,
    variables: variables,
  })
  const { data, fetching, error } = result
  return { data, fetching, error }
}
