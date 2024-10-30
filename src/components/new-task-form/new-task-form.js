import PropTypes from 'prop-types'
import { useState } from 'react'

import './new-task-form.css'

function NewTaskForm({ onItemAdded }) {
  const [description, setDescription] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const onMinutesChange = (e) => {
    const reg = /^\d+$/
    if (e.target.value === '') {
      setMinutes('')
    } else if (!reg.test(e.target.value)) {
      // empty
    } else if (e.target.value === '0') {
      setMinutes(Number(0))
    } else {
      setMinutes(e.target.value)
    }
  }

  const onSecondsChange = (e) => {
    const reg = /^\d+$/
    if (e.target.value === '') {
      setSeconds('')
    } else if (!reg.test(e.target.value)) {
      // empty
    } else if (e.target.value > 59) {
      setSeconds(59)
    } else {
      setSeconds(e.target.value)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (description.trim() === '') {
      setDescription('')
      return
    }

    onItemAdded(description, minutes, seconds)
    setDescription('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input type="text" className="new-todo" onChange={onDescriptionChange} placeholder="Task" value={description} />
        <input
          type="text"
          className="new-todo-form__timer"
          onChange={onMinutesChange}
          placeholder="Min"
          value={minutes}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          onChange={onSecondsChange}
          placeholder="Sec"
          value={seconds}
        />
        <button type="submit" style={{ display: 'none' }}>
          button
        </button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
