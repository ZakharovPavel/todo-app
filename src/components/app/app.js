/* eslint-disable consistent-return */
import { useState } from 'react'

import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'
import './app.css'
import NewTaskForm from '../new-task-form'

function App() {
  const [taskData, setTaskData] = useState([])
  const [filter, setFilter] = useState('all')
  const [taskId, setTaskId] = useState(1)

  const filterItems = (tasks, filterState) => {
    if (filterState === 'all') {
      return tasks
    }
    if (filterState === 'active') {
      return tasks.filter((el) => !el.completed)
    }
    if (filterState === 'completed') {
      return tasks.filter((el) => el.completed)
    }
    return ''
  }

  const onComplete = (id) => {
    setTaskData((prevData) => {
      const idx = prevData.findIndex((item) => item.id === id)

      const oldItem = prevData[idx]
      const { timerId } = oldItem
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
        isTimerActive: false,
        timerId: clearInterval(timerId),
      }

      const newArray = [...prevData.slice(0, idx), newItem, ...prevData.slice(idx + 1)]

      return newArray
    })
  }

  const onEdit = (id) => {
    setTaskData((prevData) => {
      const idx = prevData.findIndex((item) => item.id === id)

      const oldItem = prevData[idx]
      const newItem = {
        ...oldItem,
        editing: !oldItem.editing,
      }

      const newArray = [...prevData.slice(0, idx), newItem, ...prevData.slice(idx + 1)]

      return newArray
    })
  }

  const changeItem = (nextItem) => {
    setTaskData((prevData) => {
      return prevData.map((t) => {
        if (t.id === nextItem.id) return nextItem
        return t
      })
    })
  }

  // eslint-disable-next-line react/sort-comp
  function createTaskItem(description, minutes, seconds) {
    const createdDate = new Date().toString()
    setTaskId((prev) => prev + 1)

    return {
      description,
      created: createdDate,
      editing: false,
      completed: false,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
      timerId: null,
      isTimerActive: false,
      // eslint-disable-next-line no-plusplus
      id: taskId,
    }
  }

  //
  const addItem = (text, minutes, seconds) => {
    const newTask = createTaskItem(text, minutes, seconds)

    setTaskData((prevData) => {
      const newArr = [...prevData, newTask]

      return newArr
    })
  }

  const deleteItem = (id) => {
    setTaskData((prevData) => {
      const idx = prevData.findIndex((item) => item.id === id)
      const newArray = [...prevData.slice(0, idx), ...prevData.slice(idx + 1)]

      return newArray
    })
  }

  const onFilterChange = (name) => {
    setFilter(name)
  }

  const clearCompletedItems = () => {
    setTaskData((prevData) => {
      const newArr = prevData.filter((el) => !el.completed)

      return newArr
    })
  }

  const getTaskItem = (id) => {
    const filteredTask = taskData.filter((el) => el.id === id)
    const [oldItem] = filteredTask

    return oldItem
  }

  const startTimer = (id) => {
    const currentItem = getTaskItem(id)
    if (currentItem.isTimerActive) return

    setTaskData((prevData) => {
      const idx = prevData.findIndex((item) => item.id === id)
      const newItem = {
        ...currentItem,
        isTimerActive: true,
      }

      const newArray = [...prevData.slice(0, idx), newItem, ...prevData.slice(idx + 1)]

      return newArray
    })

    const timerId = setInterval(() => {
      const filteredTask = taskData.filter((el) => el.id === id)

      if (filteredTask.length === 0) return

      // const idx = taskData.findIndex((el) => el.id === id)

      const [oldItem] = filteredTask

      const { minutes, seconds } = oldItem

      let newItem = {}
      if (Number(minutes) === 0 && Number(seconds) === 0) {
        newItem = {
          ...oldItem,
          minutes: oldItem.minutes,
          seconds: oldItem.seconds,
          isTimerActive: false,
          timerId: clearInterval(timerId),
        }
      } else if (Number(seconds) === 0 && Number(minutes) !== 0) {
        newItem = {
          ...oldItem,
          minutes: oldItem.minutes <= 10 ? `0${Number(oldItem.minutes - 1)}` : `${Number(oldItem.minutes - 1)}`,
          seconds: 59,
          timerId,
          isTimerActive: true,
        }
      } else if (Number(seconds) > 0) {
        newItem = {
          ...oldItem,
          seconds: oldItem.seconds <= 10 ? `0${Number(oldItem.seconds - 1)}` : `${Number(oldItem.seconds - 1)}`,
          timerId,
          isTimerActive: true,
        }
      }

      // const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

      setTaskData((prevData) => prevData.map((task) => (task.id === id ? newItem : task)))
    }, 1000)
  }

  const stopTimer = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const oldItem = getTaskItem(id)
    const { timerId } = oldItem
    const newItem = {
      ...oldItem,
      isTimerActive: false,
    }
    const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
    setTaskData(newArray)
    clearInterval(timerId)
  }

  const filteredItems = filterItems(taskData, filter)

  const activeTaskCounter = taskData.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <TaskList
        tasks={filteredItems}
        onComplete={onComplete}
        onDelete={deleteItem}
        onEdit={onEdit}
        onChangeItem={changeItem}
        onStartTimer={startTimer}
        onStopTimer={stopTimer}
      />
      <Footer
        taskCounter={activeTaskCounter}
        filter={filter}
        onFilterChange={onFilterChange}
        onClearCompleted={clearCompletedItems}
      />
    </section>
  )
}

export default App
