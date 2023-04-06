import {
  getUserInput,
  inquirerMenu,
  inquirerPause,
  MENU_OPTIONS,
  printResults,
} from './helpers/inquirerMenu.js'

const main = async () => {
  let option
  let input

  do {
    option = await inquirerMenu()

    switch (option) {
      case MENU_OPTIONS.SEARCH_CITY:
        input = await getUserInput('Ciudad: ')
        console.log(input)

        printResults()

        break

      default:
        break
    }

    await inquirerPause()
  } while (option !== MENU_OPTIONS.EXIT)
}

main()
