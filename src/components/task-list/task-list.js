import PropTypes from "prop-types";
import Task from "../task";

import './task-list.css';

const TaskList = ({
  tasks = [], 
  onComplete = () => {}, 
  onDelete = () => {}
}) => {

  const elements = tasks.map((item) => {
    const {id, ...taskProps} = item;

    let classNames;
    if (item.completed) classNames = 'completed';
    else if (item.editing) classNames = 'editing';

    return (
      <li key={id} className={classNames}>
        <Task
          {...taskProps}
          onComplete={() => onComplete(id)}
          onDelete={() => onDelete(id)} 
          />
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    );

  });

  return (
    <section className="main">
      <ul className="todo-list">
        {elements}
      </ul>
    </section>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onComplete: PropTypes.func,
  onDelete: PropTypes.func
}

export default TaskList;