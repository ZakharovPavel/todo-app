import PropTypes from 'prop-types'
import { Component } from 'react'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
    }
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { description } = this.state
    const { onItemAdded } = this.props

    onItemAdded(description)
    this.setState({
      description: '',
    })
  }

  render() {
    const { description } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          onChange={this.onDescriptionChange}
          placeholder="What need to be done?"
          value={description}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
