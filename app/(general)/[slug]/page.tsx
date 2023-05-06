'use client'

import { DaoHeaderCard } from '@/integrations/tally/components/dao-header-card'
import { Skeleton as DaoHeaderCardSkeleton } from '@/integrations/tally/components/dao-header-card/skeleton'
import { GovernorStats } from '@/integrations/tally/components/governor-stats'
import { Skeleton as GovernorStatsSkeleton } from '@/integrations/tally/components/governor-stats/skeleton'
import { Proposals } from '@/integrations/tally/components/proposals'
import { Skeleton as ProposalsSkeleton } from '@/integrations/tally/components/proposals/skeleton'
import { useQueryGovernancesBySlug } from '@/integrations/tally/queries/query-governance-by-slug'

interface DaoPageProps {
  params: {
    slug: string
  }
}

export default function DaoPage({ params }: DaoPageProps) {
  const { data, fetching } = useQueryGovernancesBySlug({
    slug: params.slug,
  })
  const governanceBySlug = data?.governanceBySlug
  const stats = governanceBySlug?.stats

  if (fetching)
    return (
      <section className="flex w-full max-w-6xl flex-col gap-y-4">
        <DaoHeaderCardSkeleton />
        <GovernorStatsSkeleton />
        <ProposalsSkeleton />
      </section>
    )

  return (
    <section className="flex w-full max-w-6xl flex-col gap-y-4 px-4">
      <DaoHeaderCard
        name={governanceBySlug.name}
        description={governanceBySlug.organization.description}
        logoSrc={governanceBySlug.organization.visual.icon}
        slug={params.slug}
        chainId={governanceBySlug.chainId}
      />
      <GovernorStats total={stats.proposals.total} owners={stats.tokens.owners} voters={stats.tokens.voters} />
      <Proposals daoName={governanceBySlug.name} daoSlug={params.slug} proposals={governanceBySlug.proposals} stats={governanceBySlug.stats} />
    </section>
  )
}
