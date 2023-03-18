import Task from './task.js'

export default class Tasks {
  private _list: Record<string, Task>

  constructor() {
    this._list = {}
  }

  get listArray() {
    const list = Object.values(this._list)
    return list
  }

  printList() {
    console.log(this._list)
  }
  add(description: string) {
    const newTask = new Task(description)
    this._list[newTask.id] = newTask
  }
  loadFromArray(data: Task[]) {
    data.forEach((task) => {
      const newTask = new Task(task)
      this._list[newTask.id] = newTask
    })
  }
}
