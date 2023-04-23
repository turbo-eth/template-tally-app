import * as React from 'react'

interface GovernorCardProps {
  className?: string
  governor: any
}

export const GovernorCard = ({ className, governor }: GovernorCardProps) => {
  return (
    <article key={governor.id} className={className}>
      <div>
        <h3 className="text-gradient-sand text-4xl font-bold">{governor.name}</h3>
        <div>{governor.id}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="text-center">
          <div className="text-4xl font-normal">{governor.proposalStats.active}</div>
          <div>Active Proposals</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-normal">{governor.proposalStats.total}</div>
          <div>Total Proposals</div>
        </div>
      </div>
    </article>
  )
}
