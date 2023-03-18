import Task from '../models/task.js'
import fs from 'fs'

const file = './src/db/data.json'

export const saveDb = (data: Task[]) => {
  fs.writeFileSync(file, JSON.stringify(data))
}

export const readDb = () => {
  if (!fs.existsSync(file)) return null

  const json = fs.readFileSync(file, { encoding: 'utf8' })

  return JSON.parse(json)
}
