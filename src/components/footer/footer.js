import './footer.css';
import TaskFilter from "../task-filter";

const Footer = ({taskCounter}) => {
  return (
    <footer className="footer">
      <span>{taskCounter} items left</span>
      <TaskFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;