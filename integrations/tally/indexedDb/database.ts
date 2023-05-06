import Dexie, { Table } from 'dexie'

export interface DaoSummary {
  id: string
  summary: string
}

export class SummaryDb extends Dexie {
  daoSummary!: Table<DaoSummary>

  constructor() {
    super('daoSummary')
    this.version(1).stores({
      daoSummary: 'id, summary',
    })
  }
}
