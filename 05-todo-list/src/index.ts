import {
  deleteTaskPrompt,
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
  let taskId: string

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
        tasks.printList()
        break

      case MENU_OPTIONS.LIST_COMPLETED:
        tasks.printFiltered(true)
        break
      case MENU_OPTIONS.LIST_PENDING:
        tasks.printFiltered(false)
        break

      case MENU_OPTIONS.DELETE_TASK:
        taskId = await deleteTaskPrompt(tasks.listArray)
        tasks.deleteTask(taskId)
        break

      default:
        break
    }

    saveDb(tasks.listArray)

    if (option !== 0) {
      console.log('\n')
      await inquirerPause()
    }
  } while (option !== 0)
}

main()
