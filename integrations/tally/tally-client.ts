import { Client, cacheExchange, fetchExchange } from 'urql'

const NEXT_PUBLIC_TALLY_API_KEY = process.env.NEXT_PUBLIC_TALLY_API_KEY

const getTallyClient = () => {
  if (!NEXT_PUBLIC_TALLY_API_KEY) throw new Error('env variable NEXT_PUBLIC_TALLY_API_KEY is not set')

  return new Client({
    url: 'https://api.tally.xyz/query',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: { 'Api-key': NEXT_PUBLIC_TALLY_API_KEY },
      }
    },
  })
}

export const tallyClient = getTallyClient()
