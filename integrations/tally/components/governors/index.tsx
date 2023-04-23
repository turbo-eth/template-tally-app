import * as React from 'react'

import classNames from 'clsx'

import { Skeleton } from './skeleton'
import { useQueryGovernors } from '../../queries/query-governors'
import { GovernorCard } from '../governor-card'

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

  if (fetching) return <Skeleton className={className} />
  if (error) return <div className="text-center">Error: {error.message} </div>

  const classes = classNames(className, 'Governors')
  const classesItem = classNames(classNameItem, 'GovernorItem')
  return (
    <div className={classes}>
      {data?.governors.map((governor: any) => (
        <GovernorCard key={governor.id} governor={governor} className={classesItem} />
      ))}
    </div>
  )
}
