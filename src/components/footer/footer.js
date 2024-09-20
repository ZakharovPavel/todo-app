import PropTypes from "prop-types";
import TaskFilter from "../task-filter";

import './footer.css';

const Footer = ({
  taskCounter = 0, 
  filter, 
  onFilterChange, 
  onClearCompleted = () => {}
}) => {
    
  return (
    <footer className="footer">
      <span>{taskCounter} items left</span>
      <TaskFilter 
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <button 
        className="clear-completed"
        onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  taskCounter: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func
}

export default Footer;