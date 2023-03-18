import { v4 as uuidV4 } from 'uuid'

interface ITask {
  id: string
  desc: string
  completedAt: Date | null
}

export default class Task implements ITask {
  id: string
  desc: string
  completedAt: Date | null

  constructor(data: string | ITask) {
    if (typeof data === 'string') {
      this.id = uuidV4()
      this.desc = data
      this.completedAt = null
    } else {
      this.id = data.id
      this.desc = data.desc
      this.completedAt = data.completedAt
    }
  }
}
