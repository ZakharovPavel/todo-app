import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

function Task({
  description = '',
  created = new Date().toString,
  completed = false,
  onComplete = () => {},
  onDelete = () => {},
}) {
  const createdCounter = formatDistanceToNow(new Date(created), {
    includeSeconds: true,
    addSuffix: true,
  })

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={completed} onChange={onComplete} />
      <label htmlFor="icon">
        <span role="button" className="description" onClick={onComplete} onKeyDown={onComplete} tabIndex={0}>
          {description}
        </span>
        <span className="created">created {createdCounter}</span>
      </label>
      <button type="button" className="icon icon-edit" aria-label="Edit task" />
      <button type="button" className="icon icon-destroy" onClick={onDelete} aria-label="Delete task" />
    </div>
  )
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Task
