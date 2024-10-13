import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

function TaskList({
  tasks = [],
  onComplete = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onChangeItem = () => {},
  onStartTimer = () => {},
  onStopTimer = () => {},
}) {
  const elements = tasks.map((item) => {
    const { id, ...taskProps } = item
    const { description, created, editing, completed, minutes, seconds } = taskProps

    let classNames
    if (item.completed) classNames = 'completed'
    if (item.editing) classNames = 'editing'

    const onSubmit = (e) => {
      e.preventDefault()
      onEdit(id)
    }

    const changeItemHandler = (e) => {
      onChangeItem({
        ...item,
        description: e.target.value,
      })
    }

    return (
      <li key={id} className={classNames}>
        <Task
          description={description}
          created={created}
          editing={editing}
          completed={completed}
          onComplete={() => onComplete(id)}
          onDelete={() => onDelete(id)}
          onEdit={() => onEdit(id)}
          minutes={minutes}
          seconds={seconds}
          id={id}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={item.description} onChange={changeItemHandler} />
        </form>
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
  onEdit: PropTypes.func.isRequired,
}

export default TaskList
