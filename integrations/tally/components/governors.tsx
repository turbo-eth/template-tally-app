import * as React from 'react'

import classNames from 'clsx'

import { useQueryGovernors } from '../queries/query-governors'

interface GovernorsProps {
  className?: string
  classNameItem?: string
  variables?: {
    chainIds?: string[]
    pagination?: {
      limit?: number
      offset?: number
    }
    sort?: {
      field?: string
      order?: string
    }
  }
}

export const Governors = ({ className, classNameItem, variables }: GovernorsProps) => {
  const { data, fetching, error } = useQueryGovernors({
    chainIds: variables?.chainIds,
    pagination: {
      limit: variables?.pagination?.limit || 5,
      offset: variables?.pagination?.offset || 0,
    },
    sort: {
      field: variables?.sort?.field || 'TOTAL_PROPOSALS',
      order: variables?.sort?.order || 'DESC',
    },
  })

  if (fetching) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center">Error: {error.message} </div>

  const classes = classNames(className, 'Governors')
  const classesItem = classNames(classNameItem, 'GovernorItem')
  return (
    <div className={classes}>
      {data?.governors.map((governor: any, index: number) => {
        return (
          <div key={governor.id} className={classesItem}>
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
          </div>
        )
      })}
    </div>
  )
}
