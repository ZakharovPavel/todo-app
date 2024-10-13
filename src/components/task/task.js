import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

function Task({
  description = '',
  created = new Date().toString,
  completed = false,
  onComplete = () => {},
  onDelete = () => {},
  onEdit = () => {},
  minutes = 0,
  seconds = 0,
  id = 0,
  onStartTimer = () => {},
  onStopTimer = () => {},
}) {
  const createdCounter = formatDistanceToNow(new Date(created), {
    includeSeconds: true,
    addSuffix: true,
  })

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={completed} onChange={onComplete} />
      <label htmlFor="icon">
        <span role="button" className="title" onClick={onComplete} onKeyDown={onComplete} tabIndex={0}>
          {description}
        </span>
        <span className="description">
          <button type="button" className="icon icon-play" aria-label="Play" onClick={() => onStartTimer(id)} />
          <button type="button" className="icon icon-pause" aria-label="Pause" onClick={() => onStopTimer(id)} />
          <span className="timer">
            {minutes}:{seconds}
          </span>
        </span>
        <span className="description">created {createdCounter}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="Edit task" />
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
  onEdit: PropTypes.func.isRequired,
}

export default Task
