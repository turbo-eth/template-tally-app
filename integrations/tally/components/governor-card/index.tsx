import * as React from 'react'

import Link from 'next/link'

import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { tallyChainObjects } from '@/integrations/tally/config/chains'
import { formatNumberCompact } from '@/lib/utils'

import { ChainTag } from '../chain-tag'

interface GovernorCardProps {
  className?: string
  governor: any
}

export const GovernorCard = ({ className, governor }: GovernorCardProps) => {
  const { stats, slug } = governor
  const chainId = governor.chainId as keyof typeof tallyChainObjects
  const chainInfo = tallyChainObjects?.[chainId]
  return (
    <Link href={`/${slug}`} key={governor.id} className={className}>
      <div className="flex flex-col items-center">
        <div className="relative h-[85px] w-[85px] overflow-hidden rounded-full">
          <ImageWithFallback
            fallbackSrc="/fallback-logo.png"
            fill
            className="rounded-full"
            sizes="30vh"
            src={governor.organization.visual.icon || '/fallback-logo.png'}
            alt={`${governor.name} logo`}
          />
        </div>
        <h3 className="text-gradient-sand mt-5 px-1 text-center text-3xl font-bold line-clamp-1">{governor.name}</h3>
      </div>
      {stats.proposals.active > 0 && <h5 className="rounded bg-violet-50 p-2 font-medium text-indigo-600">Active proposal</h5>}
      {chainInfo && <ChainTag src={chainInfo.logoSrc} name={chainInfo.name} />}
      <div className="flex items-center gap-x-4">
        <div className="text-center">
          <h4 className="text-base font-semibold">Proposals</h4>
          <div className="mt-1 text-lg font-normal">{formatNumberCompact(stats.proposals.total)}</div>
        </div>
        <div className="text-center">
          <h4 className="text-base font-semibold">Holders</h4>
          <div className="mt-1 text-lg font-normal">{formatNumberCompact(stats.tokens.owners)}</div>
        </div>
        <div className="text-center">
          <h4 className="text-base font-semibold">Voters</h4>
          <div className="mt-1 text-lg font-normal">{formatNumberCompact(stats.tokens.voters)}</div>
        </div>
      </div>
    </Link>
  )
}
