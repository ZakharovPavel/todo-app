
import { Component } from 'react';
import Header from '../header';
import Footer from '../footer/footer';
import TaskList from '../task-list/task-list';

import './app.css';

export default class App extends Component {

  state = {
    taskData: [
      {description: 'Completed task', created: 'today', editing: false, completed: false, id: 1},
      {description: 'Editing task', created: 'today', editing: false, completed: false, id: 2},
      {description: 'Active task', created: 'today', editing: false, completed: false, id: 3},
    ]
  }

  onComplete = (id) => {
    this.setState(({taskData}) => {
      const idx = taskData.findIndex((item) => item.id === id);
      let newItem = taskData[idx];

      newItem = { ...taskData[idx], completed: !taskData[idx].completed };

      const newArray = [
        ...taskData.slice(0, idx),
        newItem,
        ...taskData.slice(idx + 1)
      ];

      console.log(newArray);
      
      return {taskData: newArray};
    });
  }

  onDelete = (id) => {
    this.setState(({taskData}) => {
      const idx = taskData.findIndex((item) => item.id === id);
      const newArray = [
        ...taskData.slice(0, idx),
        ...taskData.slice(idx + 1)
      ];

      console.log(newArray);

      return {taskData: newArray};
    });
  }

  render() {
    const {taskData} = this.state;
    let taskCounter = taskData.length;
  
    return (
      <section className='todoapp'>
        <Header />
        <TaskList 
          tasks={taskData}
          onComplete={this.onComplete} 
          onDelete={this.onDelete}
           />
        <Footer taskCounter={taskCounter} />
      </section>
    );
  }

}

