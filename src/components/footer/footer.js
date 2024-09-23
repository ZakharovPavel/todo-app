import PropTypes from 'prop-types'

import TaskFilter from '../task-filter'

import './footer.css'

function Footer({ taskCounter = 0, filter, onFilterChange, onClearCompleted = () => {} }) {
  return (
    <footer className="footer">
      <span>{taskCounter} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  taskCounter: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
