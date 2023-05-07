import Image from 'next/image'

import { LinkComponent } from '@/components/shared/link-component'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { tallyChainObjects } from '@/integrations/tally/config/chains'

import { ChainTag } from '../chain-tag'

export interface DaoHeaderCardProps {
  chainId: keyof typeof tallyChainObjects
  name: string
  description: string
  logoSrc: string
  slug: string
}
export const DaoHeaderCard = ({ chainId, description, name, logoSrc, slug }: DaoHeaderCardProps) => {
  const chainInfo = tallyChainObjects?.[chainId]

  return (
    <div className="card w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative min-h-[50px] min-w-[50px] overflow-hidden rounded-full">
            <ImageWithFallback fallbackSrc="/fallback-logo.png" fill className="rounded-full" sizes="30vh" src={logoSrc} alt={`${name} logo`} />
          </div>
          <h3 className="text-gradient-sand ml-3 text-2xl font-bold md:text-3xl ">{name}</h3>
        </div>
        <LinkComponent
          className="hidden rounded-lg bg-gray-200/50 px-4 py-3 text-base font-medium hover:bg-gray-200/60 md:block"
          href={`https://www.tally.xyz/gov/${slug}`}>
          See more
        </LinkComponent>
      </div>
      <div className="mt-5 px-1 text-lg tracking-wide">{description}</div>
      <div className="mt-5 flex items-center justify-between">
        {chainInfo && <ChainTag src={chainInfo.logoSrc} name={chainInfo.name} />}
        <LinkComponent
          className="rounded-lg bg-gray-200/60 px-4 py-3 text-base font-medium hover:bg-gray-200/80 md:hidden"
          href={`https://www.tally.xyz/gov/${slug}`}>
          See more
        </LinkComponent>
      </div>
    </div>
  )
}
