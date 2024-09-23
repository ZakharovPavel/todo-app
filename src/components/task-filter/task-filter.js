import PropTypes from 'prop-types'

import './task-filter.css'

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
]

function TaskFilter({ filter = 'all', onFilterChange = () => {} }) {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter
    const classNames = isActive ? 'selected' : ''

    return (
      <li key={name}>
        <button type="button" onClick={() => onFilterChange(name)} className={classNames}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default TaskFilter
