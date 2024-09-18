import './footer.css';
import TaskFilter from "../task-filter";

const Footer = ({taskCounter, filter, onFilterChange, onClearCompleted}) => {
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

export default Footer;