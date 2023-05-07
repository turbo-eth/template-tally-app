import { IProposal } from '../../types'
import { ProposalCard } from '../proposal-card'

interface ProposalsProps {
  daoSlug: string
  daoName: string
  stats: {
    proposals: {
      passed: number
      failed: number
    }
  }
  proposals: IProposal[]
}

export const Proposals = ({ daoSlug, daoName, stats, proposals }: ProposalsProps) => (
  <div className="card">
    <div className="flex flex-wrap items-center justify-between px-2">
      <h3 className="text-xl font-bold">Proposals</h3>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center font-medium">
          {stats.proposals.passed}
          <span className="ml-2 text-emerald-400">Passed</span>
        </div>
        <div className="flex items-center font-medium">
          {stats.proposals.failed}
          <span className="ml-2 text-rose-500">Failed</span>
        </div>
      </div>
    </div>
    <hr className="my-4" />
    <div className="flex flex-col gap-y-4">
      {proposals?.map((proposal: IProposal) => {
        const forVotes = proposal.voteStats.find((vote: { support: string }) => vote.support === 'FOR')
        const againstVotes = proposal.voteStats.find((vote: { support: string }) => vote.support === 'AGAINST')
        const abstainVotes = proposal.voteStats.find((vote: { support: string }) => vote.support === 'ABSTAIN')

        const formattedForVotes = forVotes ? (Number(forVotes.percent) * Number(forVotes.weight)) / 10 ** 20 : 0
        const formattedAgainstVotes = againstVotes ? (Number(againstVotes.percent) * Number(againstVotes.weight)) / 10 ** 20 : 0
        const formattedAbstainVotes = abstainVotes ? (Number(abstainVotes.percent) * Number(abstainVotes.weight)) / 10 ** 20 : 0
        const formattedTotalVotes = formattedForVotes + formattedAgainstVotes + formattedAbstainVotes
        return (
          <ProposalCard
            key={proposal.id}
            daoName={daoName}
            daoSlug={daoSlug}
            proposal={proposal}
            forVotes={formattedForVotes}
            againstVotes={formattedAgainstVotes}
            totalVotes={formattedTotalVotes}
          />
        )
      })}
    </div>
  </div>
)
