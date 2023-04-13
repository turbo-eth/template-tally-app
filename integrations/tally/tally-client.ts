import { Client, cacheExchange, fetchExchange } from 'urql'

export const tallyClient = new Client({
  url: 'https://api.tally.xyz/query',
  exchanges: [cacheExchange, fetchExchange],
  // @ts-ignore
  fetchOptions: () => {
    return {
      headers: { 'Api-key': process.env.NEXT_PUBLIC_TALLY_API_KEY },
    }
  },
})
