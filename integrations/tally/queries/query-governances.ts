import { gql, useQuery } from 'urql'

export const queryGovernances = gql`
  query Governances($chainIds: [ChainID!], $pagination: Pagination, $sort: GovernanceSort) {
    governances(chainIds: $chainIds, pagination: $pagination, sort: $sort) {
      id
      chainId
      slug
      name
      stats {
        proposals {
          total
          active
        }
        tokens {
          voters
          owners
        }
      }
      organization {
        visual {
          icon
        }
      }
    }
  }
`
interface IUseQueryGovernancesVariables {
  chainIds?: string[]
  pagination?: {
    limit: number
    offset: number
  }
  sort: {
    field: string
    order: string
  }
}

export const useQueryGovernances = (variables: IUseQueryGovernancesVariables) => {
  const [result] = useQuery({
    query: queryGovernances,
    variables,
  })
  const { data, fetching, error } = result
  return { data, fetching, error }
}
