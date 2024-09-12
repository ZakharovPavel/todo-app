import './task-list.css';
import Task from "../task";

const TaskList = ({tasks}) => {

  const elements = tasks.map((item) => {
    const {id, ...taskProps} = item;

    let className; 
    if (taskProps.completed) className = 'completed';
    else if (taskProps.editing) className = 'editing';

    return (
      <li key={id} className={className}>
        <Task {...taskProps} />
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

export default TaskList;