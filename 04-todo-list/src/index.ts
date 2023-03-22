import {
  completeMultipleTasksPrompt,
  deleteTaskPrompt,
  getUserConfirmation,
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
  let confirmDeletion: boolean | null = null
  let completedIds

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
      case MENU_OPTIONS.COMPLETE_TASK:
        completedIds = await completeMultipleTasksPrompt(tasks.listArray)
        tasks.toggleCompletedTasks(completedIds)
        break

      case MENU_OPTIONS.DELETE_TASK:
        taskId = await deleteTaskPrompt(tasks.listArray)

        if (taskId && taskId !== '0') {
          confirmDeletion = await getUserConfirmation('Estas seguro?')
        }

        if (confirmDeletion && taskId !== '0') tasks.deleteTask(taskId)

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
