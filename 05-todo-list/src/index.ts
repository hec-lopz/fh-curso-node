import {
  getUserInput,
  inquirerMenu,
  inquirerPause,
  MENU_OPTIONS,
} from './helpers/inquirerMenu.js'
import { readDb, saveDb } from './helpers/dbActions.js'
import Tasks from './models/tasks.js'

async function main() {
  let option: number
  let taskDesc: string

  const tasks = new Tasks()
  const tasksFromDb = readDb()

  if (tasksFromDb) {
    tasks.loadFromArray(tasksFromDb)
  }

  do {
    option = await inquirerMenu()

    switch (option) {
      case MENU_OPTIONS.CREATE_TASK:
        taskDesc = await getUserInput('Descripción:')
        tasks.add(taskDesc)
        break
      case MENU_OPTIONS.LIST_TASKS:
        console.log(tasks.listArray)
        break

      default:
        break
    }

    saveDb(tasks.listArray)

    if (option !== 0) await inquirerPause()
  } while (option !== 0)
}

main()
