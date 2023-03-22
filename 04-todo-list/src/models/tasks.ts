import Task from './task.js'
import 'colors'

export default class Tasks {
  private _list: Record<string, Task>

  constructor() {
    this._list = {}
  }

  get listArray() {
    const list = Object.values(this._list)
    return list
  }

  printList(list?: Task[]) {
    console.log()
    const formatter = (task: Task, idx: number) => {
      const index = `${idx + 1}.`.green
      const { desc, completedAt } = task
      const status = completedAt ? 'Completada'.green : 'Pendiente'.red

      console.log(`  ${index} ${desc} :: ${status}`)
    }

    if (list?.length === 0 || this.listArray.length === 0) {
      console.log('  No hay tareas para mostrar')
      return
    }

    !list ? this.listArray.forEach(formatter) : list.forEach(formatter)
  }
  printFiltered(completed = true) {
    const filteredList = this.listArray.filter(
      (task) => !completed === !task.completedAt
    )

    if (completed) {
      this.printCompletedTasks(filteredList)
    } else {
      this.printList(filteredList)
    }
  }
  printCompletedTasks(list: Task[]) {
    list.forEach((task, idx) => {
      const index = `${idx + 1}.`.green
      const { desc, completedAt } = task
      const status = completedAt?.green

      console.log(`${index} ${desc} :: ${status}`)
    })
  }
  add(description: Task['desc']) {
    const newTask = new Task(description)
    this._list[newTask.id] = newTask
  }

  toggleCompletedTasks(idArr: Task['id'][]) {
    this.listArray.forEach((task) => {
      if (idArr.includes(task.id)) {
        task.completedAt = new Date().toISOString()
      } else {
        task.completedAt = null
      }
    })
  }

  deleteTask(id: Task['id']) {
    if (!this._list[id]) return

    delete this._list[id]
  }
  loadFromArray(data: Task[]) {
    data.forEach((task) => {
      const newTask = new Task(task)
      this._list[newTask.id] = newTask
    })
  }
}
