import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

function TaskList({ tasks = [], onComplete = () => {}, onDelete = () => {} }) {
  const elements = tasks.map((item) => {
    const { id, ...taskProps } = item
    const { description, created, completed } = taskProps

    let classNames
    if (item.completed) classNames = 'completed'
    else if (item.editing) classNames = 'editing'

    return (
      <li key={id} className={classNames}>
        <Task
          description={description}
          created={created}
          completed={completed}
          onComplete={() => onComplete(id)}
          onDelete={() => onDelete(id)}
        />
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    )
  })

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default TaskList
