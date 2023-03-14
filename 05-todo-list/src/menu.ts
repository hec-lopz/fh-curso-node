import 'colors'
import { createInterface } from 'readline'

const listOptions = [
  'Crear tarea',
  'Listar tareas',
  'Listar tareas completadas',
  'Listar tareas pendientes',
  'Completar tarea(s)',
  'Borrar tarea',
]

export const printMenu = () => {
  return new Promise<string>((resolve) => {
    console.clear()
    console.log('='.repeat(27).green)
    console.log('   Selecciona una opción   '.green)
    console.log('='.repeat(27).green)

    listOptions.forEach((item, index) =>
      console.log(`${index.toString()}.`.green, item)
    )

    console.log('0.'.green, 'Salir\n')

    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question('Seleccione una opción: ', (opt) => {
      console.log(opt)
      readline.close()
      resolve(opt)
    })
  })
}

export const pauseMenu = () => {
  return new Promise<void>((resolve) => {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question(`\nPresione ${'Enter'.green} para continuar`, () => {
      readline.close()
      resolve()
    })
  })
}
