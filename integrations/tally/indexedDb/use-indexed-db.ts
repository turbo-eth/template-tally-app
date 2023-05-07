import { useLiveQuery } from 'dexie-react-hooks'

import { type DaoSummary, SummaryDb } from './database'

export const db = new SummaryDb()

export const useIndexedDb = () => {
  const daoSummary = useLiveQuery(() => db.daoSummary.toArray(), [])

  const getDaoSummary = async (id: string) => {
    const storedDaoSummary = await db.daoSummary.get(id)
    return storedDaoSummary
  }

  const saveDaoSummary = async ({ id, summary }: DaoSummary) => {
    if (!summary) {
      throw new Error('Invalid summary')
    }

    await db.daoSummary.add({
      id,
      summary,
    })

    return { id, summary }
  }

  const deleteDaoSummary = async (id: string) => {
    const storedDaoSummary = await getDaoSummary(id)
    if (!storedDaoSummary) {
      throw new Error('DAO summary does not exist')
    }
    await db.daoSummary.delete(id)
  }

  const deleteAllDaoSummaries = async () => {
    await db.daoSummary.clear()
  }

  return { daoSummary, getDaoSummary, saveDaoSummary, deleteDaoSummary, deleteAllDaoSummaries }
}
