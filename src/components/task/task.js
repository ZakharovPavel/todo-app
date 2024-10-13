import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'
// import { useEffect, useState } from 'react'

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
  // const [isActive, setIsActive] = useState(false)
  // const [secondsLeft, setSecondsLeft] = useState(seconds)
  // const [minutesLeft, setMinutesLeft] = useState(minutes)

  // useEffect(() => {
  //   let timer = null

  //   if (isActive && secondsLeft > 0) {
  //     timer = setInterval(() => {
  //       // if (secondsLeft === 0 && minutesLeft > 0) {
  //       if (secondsLeft === 0) {
  //         console.log('timer.if')

  //         setMinutesLeft((prevMinutes) => prevMinutes - 1)
  //         setSecondsLeft(59)
  //       } else {
  //         console.log('timer.else')
  //         setSecondsLeft((prevTime) => prevTime - 1)
  //       }
  //     }, 1000)
  //   } else if (secondsLeft === 0 && minutesLeft > 0) {
  //     console.log('else.if')
  //     setMinutesLeft((prevMinutes) => prevMinutes - 1)
  //     setSecondsLeft(59)
  //   } else {
  //     setIsActive(false)
  //   }
  //   console.log(isActive)

  //   return () => clearInterval(timer)
  // }, [isActive, secondsLeft, minutesLeft, onComplete])

  // const startTimer = () => {
  //   setIsActive(true)
  // }

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
