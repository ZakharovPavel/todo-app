import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

import "./task.css";

const Task = ({
  description = '', 
  created = new Date().toString,
  completed = false, 
  onComplete = () => {}, 
  onDelete = () => {}
}) => {

  const createdCounter = formatDistanceToNow(
    new Date(created), 
    {
      includeSeconds: true,
      addSuffix: true
    }
  );

  return (
    <div className="view">
      <input 
        className="toggle" 
        type="checkbox"
        checked={completed}
        onChange={onComplete}
      />
      <label>
        <span className="description"
          onClick={onComplete}>
          {description}
        </span>
        <span className="created">created {createdCounter}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button 
        className="icon icon-destroy"
        onClick={onDelete}></button>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.string,
  completed: PropTypes.bool,
  onComplete: PropTypes.func,
  onDelete: PropTypes.func
}

export default Task;