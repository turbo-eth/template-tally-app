import { LinkComponent } from '@/components/shared/link-component'
import { formatDate, formatNumberCompact } from '@/lib/utils'

import { IProposal } from '../../types'
import { DaoSummaryDialog } from '../dao-summary-dialog'

interface ProposalCardProps {
  daoName: string
  daoSlug: string
  proposal: IProposal
  forVotes: number
  againstVotes: number
  totalVotes: number
}

export const ProposalCard = ({ daoName, daoSlug, proposal, forVotes, againstVotes, totalVotes }: ProposalCardProps) => (
  <div className="flex items-center justify-between p-2">
    <div className="flex items-center">
      <DaoSummaryDialog proposalId={proposal.id} daoSlug={daoSlug} daoName={daoName} description={proposal.description} />
      <div className="ml-4 max-w-lg">
        <LinkComponent isExternal href={`https://www.tally.xyz/gov/${daoSlug}/proposal/${proposal.id}`}>
          <h4 className="text-lg font-bold underline-offset-2 line-clamp-1 hover:underline">{proposal.title.substring(2).split('\\n')[0]}</h4>
        </LinkComponent>
        <div className="mt-2 flex items-center">
          <p className="rounded bg-violet-100 px-2 py-1 text-xs font-semibold text-indigo-500">
            {proposal.statusChanges[proposal.statusChanges.length - 1]?.type}
          </p>
          <p className="ml-2 hidden text-sm text-gray-600 sm:inline">Proposed on: {formatDate(proposal.start.timestamp)}</p>
        </div>
      </div>
    </div>
    <div className="hidden items-center gap-x-6 text-center lg:flex">
      <div className="flex w-32 flex-col items-center gap-1 font-medium">
        <span className="text-emerald-400">{formatNumberCompact(forVotes)}</span>
        Votes For
      </div>
      <div className="flex w-32 flex-col items-center gap-1 font-medium">
        <span className="text-rose-500">{formatNumberCompact(againstVotes)}</span>
        Votes Against
      </div>
      <div className="flex w-32 flex-col items-center gap-1 font-medium">
        <span className="text-base font-semibold">{formatNumberCompact(totalVotes)}</span>
        Total Votes
      </div>
    </div>
  </div>
)
