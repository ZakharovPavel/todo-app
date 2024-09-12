
import Header from '../header';
import Footer from '../footer/footer';
import Main from '../main';
import './app.css';

const App = () => {

  const taskData = [
    {description: 'Completed task', created: 'today', completed: true, id: 1},
    {description: 'Editing task', created: 'today', editing: true, id: 2},
    {description: 'Active task', created: 'today', id: 3},
  ]

  let taskCounter = 1;

  return (
    <section className='todoapp'>
      <Header />
      <Main taskListData={taskData}/>
      <Footer taskCounter={taskCounter} />
    </section>
  );
}

export default App;