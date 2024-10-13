import { Component } from 'react'

import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'
import './app.css'
import NewTaskForm from '../new-task-form'

export default class App extends Component {
  static filterItems = (taskData, filter) => {
    if (filter === 'all') {
      return taskData
    }
    if (filter === 'active') {
      return taskData.filter((el) => !el.completed)
    }
    if (filter === 'completed') {
      return taskData.filter((el) => el.completed)
    }
    return ''
  }

  taskId = 1

  constructor(props) {
    super(props)
    this.state = {
      taskData: [],
      filter: 'all',
    }
  }

  onComplete = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((item) => item.id === id)

      const oldItem = taskData[idx]
      const { timerId } = oldItem
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
        isTimerActive: false,
        timerId: clearInterval(timerId),
      }

      const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

      return { taskData: newArray }
    })
  }

  onEdit = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((item) => item.id === id)

      const oldItem = taskData[idx]
      const newItem = {
        ...oldItem,
        editing: !oldItem.editing,
      }

      const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

      return { taskData: newArray }
    })
  }

  changeItem = (nextItem) => {
    this.setState(({ taskData }) => {
      return {
        taskData: taskData.map((t) => {
          if (t.id === nextItem.id) return nextItem
          return t
        }),
      }
    })
  }

  addItem = (text, minutes, seconds) => {
    const newTask = this.createTaskItem(text, minutes, seconds)

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newTask]

      return {
        taskData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((item) => item.id === id)
      const newArray = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]

      return { taskData: newArray }
    })
  }

  onFilterChange = (name) => {
    this.setState({
      filter: name,
    })
  }

  clearCompletedItems = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.filter((el) => !el.completed)

      return {
        taskData: newArr,
      }
    })
  }

  // eslint-disable-next-line react/sort-comp
  createTaskItem(description, minutes, seconds) {
    const createdDate = new Date().toString()
    const regexTime = /^\d+$/

    return {
      description,
      created: createdDate,
      editing: false,
      completed: false,
      minutes: minutes === '' ? 0 : minutes,
      seconds: regexTime.test(seconds) ? seconds : 0,
      timerId: null,
      isTimerActive: false,
      // eslint-disable-next-line no-plusplus
      id: this.taskId++,
    }
  }

  getTaskItem = (id) => {
    const { taskData } = this.state
    const filteredTask = taskData.filter((el) => el.id === id)
    const [oldItem] = filteredTask

    return oldItem
  }

  startTimer = (id) => {
    if (this.getTaskItem(id).isTimerActive) return
    const timerId = setInterval(() => {
      const { taskData } = this.state
      const filteredTask = taskData.filter((el) => el.id === id)

      if (filteredTask.length === 0) return

      const idx = taskData.findIndex((el) => el.id === id)

      const [oldItem] = filteredTask
      const { minutes, seconds } = oldItem

      let newItem = {}
      if ((minutes === 0 && seconds === 0) || minutes === undefined || seconds === undefined) {
        newItem = {
          ...oldItem,
          minutes: oldItem.minutes,
          seconds: oldItem.seconds,
          isTimerActive: false,
          timerId: clearInterval(timerId),
        }
      } else if (seconds === 0) {
        newItem = {
          ...oldItem,
          minutes: oldItem.minutes - 1,
          seconds: 59,
          timerId,
          isTimerActive: true,
        }
      } else {
        newItem = {
          ...oldItem,
          seconds: oldItem.seconds - 1,
          timerId,
          isTimerActive: true,
        }
      }

      const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
      this.setState({
        taskData: newArray,
      })
    }, 1000)
  }

  stopTimer = (id) => {
    const { taskData } = this.state
    const idx = taskData.findIndex((el) => el.id === id)
    const oldItem = this.getTaskItem(id)
    const { timerId } = oldItem
    const newItem = {
      ...oldItem,
      isTimerActive: false,
    }
    const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
    this.setState({
      taskData: newArray,
    })
    clearInterval(timerId)
  }

  render() {
    const { taskData, filter } = this.state
    const filteredItems = App.filterItems(taskData, filter)

    const activeTaskCounter = taskData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          tasks={filteredItems}
          onComplete={this.onComplete}
          onDelete={this.deleteItem}
          onEdit={this.onEdit}
          onChangeItem={this.changeItem}
          onStartTimer={this.startTimer}
          onStopTimer={this.stopTimer}
        />
        <Footer
          taskCounter={activeTaskCounter}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.clearCompletedItems}
        />
      </section>
    )
  }
}
