import { Component } from 'react'

import Header from '../header'
import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'

import './app.css'

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
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
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

  // changeItem = (id, text) => {
  //   this.setState(({ taskData }) => {
  //     const idx = taskData.findIndex((item) => item.id === id)

  //     const oldItem = taskData[idx]
  //     const createdDate = new Date().toString()
  //     const newItem = {
  //       ...oldItem,
  //       description: text,
  //       created: createdDate,
  //       editing: false,
  //     }

  //     const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

  //     return { taskData: newArray }
  //   })
  // }

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

  addItem = (text) => {
    const newTask = this.createTaskItem(text)

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

  createTaskItem(description) {
    const createdDate = new Date().toString()

    return {
      description,
      created: createdDate,
      editing: false,
      completed: false,
      // eslint-disable-next-line no-plusplus
      id: this.taskId++,
    }
  }

  render() {
    const { taskData, filter } = this.state
    const filteredItems = App.filterItems(taskData, filter)

    const activeTaskCounter = taskData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <TaskList
          tasks={filteredItems}
          onComplete={this.onComplete}
          onDelete={this.deleteItem}
          onEdit={this.onEdit}
          onChangeItem={this.changeItem}
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
