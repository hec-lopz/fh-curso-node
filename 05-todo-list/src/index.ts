import { inquirerMenu, inquirerPause } from './helpers/inquirerMenu.js'

async function main() {
  let option: number

  do {
    option = await inquirerMenu()

    if (option !== 0) await inquirerPause()
  } while (option !== 0)
}

main()
