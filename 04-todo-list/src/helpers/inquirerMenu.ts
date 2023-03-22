import inquirer, { ChoiceOptions } from 'inquirer'
import 'colors'
import Task from '../models/task.js'

export enum MENU_OPTIONS {
  EXIT,
  CREATE_TASK,
  LIST_TASKS,
  LIST_COMPLETED,
  LIST_PENDING,
  COMPLETE_TASK,
  DELETE_TASK,
}

const optionsList = [
  'Crear tarea',
  'Listar tareas',
  'Listar tareas completadas',
  'Listar tareas pendientes',
  'Completar tarea(s)',
  'Borrar tarea',
]

const mapOptions = (
  label: string,
  index: number,
  value?: unknown
): ChoiceOptions => {
  const idx = `${index + 1}.`.green
  return {
    name: `${idx} ${label}`,
    value: value || index + 1,
  }
}
export const inquirerMenu = async (): Promise<number> => {
  console.clear()
  console.log('='.repeat(27).green)
  console.log('   Selecciona una opción   '.green)
  console.log('='.repeat(27).green, '\n')

  const options = optionsList.map((label, idx) => mapOptions(label, idx))
  options.push({
    name: `${'0.'.green} Salir`,
    value: 0,
  })

  const { option } = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Selecciona una opción',
    choices: options,
  })

  return option
}

export const getUserInput = async (message: string): Promise<string> => {
  const { taskDesc } = await inquirer.prompt({
    type: 'input',
    name: 'taskDesc',
    message,
    validate(value: string) {
      if (value.length === 0) return 'Por favor ingresa un valor'
      return true
    },
  })

  return taskDesc
}

export const getUserConfirmation = async (
  message: string
): Promise<boolean> => {
  const { confirmation } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmation',
    message,
  })

  return confirmation
}

export const deleteTaskPrompt = async (list: Task[]) => {
  if (list.length === 0) {
    console.log('\n  No hay tareas para mostrar')
    return null
  }
  const choices = list.map(({ desc, id }, idx) => mapOptions(desc, idx, id))
  choices.unshift({
    name: `${'0.'.green} Cancelar`,
    value: '0',
  })

  const { id } = await inquirer.prompt({
    type: 'list',
    name: 'id',
    message: 'Borrar',
    choices,
  })

  return id
}

export const completeMultipleTasksPrompt = async (list: Task[]) => {
  if (list.length === 0) {
    console.log('\n  No hay tareas para mostrar')
    return null
  }
  const choices = list.map(({ desc, id, completedAt }) => {
    return {
      name: desc,
      value: id,
      checked: completedAt ? true : false,
    }
  })

  const { ids } = await inquirer.prompt({
    type: 'checkbox',
    name: 'ids',
    message: 'Selecciona las tareas completadas',
    choices,
  })

  return ids
}

export const inquirerPause = async (): Promise<void> => {
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue`,
  })
}
