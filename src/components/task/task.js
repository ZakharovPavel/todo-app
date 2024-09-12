import './task.css';

const Task = ({description, created, editing = false, completed = false}) => {

  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
}

export default Task;