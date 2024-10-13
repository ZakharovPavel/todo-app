import PropTypes from 'prop-types'
import { Component } from 'react'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    }
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    const reg = /^\d+$/
    if (!reg.test(e.target.value)) {
      // empty
    } else if (e.target.value === '') {
      this.setState({
        minutes: 0,
      })
    } else {
      this.setState({
        minutes: e.target.value,
      })
    }
  }

  onSecondsChange = (e) => {
    const reg = /^\d+$/
    if (!reg.test(e.target.value)) {
      // empty
    } else if (e.target.value > 59) {
      this.setState({
        seconds: 59,
      })
    } else {
      this.setState({
        seconds: e.target.value,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { description, minutes = 0, seconds = 0 } = this.state
    const { onItemAdded } = this.props

    if (description.trim() === '') {
      this.setState({ description: '' })
      return
    }

    onItemAdded(description, minutes, seconds)
    this.setState({
      description: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    const { description, minutes, seconds } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            onChange={this.onDescriptionChange}
            placeholder="Task"
            value={description}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            onChange={this.onMinutesChange}
            placeholder="Min"
            value={minutes}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            onChange={this.onSecondsChange}
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
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
