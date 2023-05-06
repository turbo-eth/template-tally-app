import { useMemo } from 'react'

import classNames from 'clsx'
import Fuse from 'fuse.js'

import { Skeleton } from './skeleton'
import { useQueryGovernances } from '../../queries/query-governances'
import { GovernorCard } from '../governor-card'

interface GovernorsProps {
  className?: string
  classNameItem?: string
  searchValue?: string
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

export const Governors = ({ className, classNameItem, searchValue, variables }: GovernorsProps) => {
  const { data, fetching, error } = useQueryGovernances({
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

  const fuse = useMemo(
    () =>
      new Fuse(data?.governances, {
        keys: ['name'],
        threshold: 0.3,
      }),
    [data?.governances]
  )

  const filteredGovernances = useMemo(() => {
    if (fetching || error) return
    if (!searchValue) return data?.governances
    return fuse?.search(searchValue)?.map((result) => result.item)
  }, [data?.governances, fuse, searchValue])

  if (fetching) return <Skeleton className={className} />
  if (error) return <div className="text-center">Error: {error.message} </div>

  const classes = classNames(className, 'Governors')
  const classesItem = classNames(classNameItem, 'GovernorItem')
  return filteredGovernances.length > 0 ? (
    <div className={classes}>
      {filteredGovernances?.map((governor: any) => (
        <GovernorCard key={governor.id} governor={governor} className={classesItem} />
      ))}
    </div>
  ) : (
    <div className="flex h-72 w-full items-center justify-center text-center text-3xl font-semibold ">No governors found</div>
  )
}
