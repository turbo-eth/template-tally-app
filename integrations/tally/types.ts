export interface IProposal {
  id: string
  title: string
  description: string
  voteStats: {
    percent: number
    support: 'FOR' | 'AGAINST' | 'ABSTAIN'
    weight: string
  }[]
  statusChanges: {
    type: 'PENDING' | 'ACTIVE' | 'SUCCEEDED' | 'QUEUED' | 'EXECUTED'
  }[]
  start: {
    timestamp: string
  }
}
