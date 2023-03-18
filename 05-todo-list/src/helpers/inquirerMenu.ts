import inquirer, { ChoiceOptions } from 'inquirer'
import 'colors'

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

const mapOptions = (options: string[]): ChoiceOptions[] => {
  const mappedOptions = options.map((item, index) => ({
    name: `${((index + 1).toString() + '.').green} ${item}`,
    value: index + 1,
  }))

  mappedOptions.push({
    name: `${'0.'.green} Salir`,
    value: 0,
  })

  return mappedOptions
}

export const inquirerMenu = async (): Promise<number> => {
  console.clear()
  const options = mapOptions(optionsList)
  console.log('='.repeat(27).green)
  console.log('   Selecciona una opción   '.green)
  console.log('='.repeat(27).green, '\n')

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

export const inquirerPause = async (): Promise<void> => {
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue`,
  })
}
