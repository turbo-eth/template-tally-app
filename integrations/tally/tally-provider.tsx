'use client'
import { Provider } from 'urql'

import { tallyClient } from '@/integrations/tally/tally-client'

export default function TallyProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={tallyClient}>{children}</Provider>
}
