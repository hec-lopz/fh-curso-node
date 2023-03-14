import inquirer, { ChoiceOptions } from 'inquirer'
import 'colors'

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
    message: 'Select an option',
    choices: options,
  })

  return option
}

export const inquirerPause = async (): Promise<void> => {
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue`,
  })
}
