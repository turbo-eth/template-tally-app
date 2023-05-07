import { formatNumberCompact } from '@/lib/utils'

interface GovernorStatsProps {
  total: number
  owners: number
  voters: number
}

export const GovernorStats = ({ total, owners, voters }: GovernorStatsProps) => (
  <div className="card flex h-24 items-center justify-around text-center">
    <div>
      <p className="mb-1 text-2xl font-semibold">{formatNumberCompact(total)}</p>
      <h4>Proposals</h4>
    </div>
    <div>
      <p className="mb-1 text-2xl font-semibold">{formatNumberCompact(owners)}</p>
      <h4>Holders</h4>
    </div>
    <div>
      <p className="mb-1 text-2xl font-semibold">{formatNumberCompact(voters)}</p>
      <h4>Voters</h4>
    </div>
  </div>
)
