import './main.css';
import TaskList from '../task-list';

const Main = ({taskListData}) => {
  return (
    <section className="main">
      <TaskList tasks={taskListData} />
    </section>
  );
};

export default Main;