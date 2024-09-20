
import { Component } from 'react';

import Header from '../header';
import Footer from '../footer/footer';
import TaskList from '../task-list/task-list';

import './app.css';

export default class App extends Component {

  taskId = 1;

  state = {
    taskData: [
      this.createTaskItem('Completed task'),
      this.createTaskItem('Editing task'),
      this.createTaskItem('Active task')
    ],
    filter: 'all'
  }

  createTaskItem(description) {

    const createdDate = new Date().toString();

    return {
      description: description,
      created: createdDate,
      editing: false,
      completed: false,
      id: this.taskId++
    }
  }

  onComplete = (id) => {
    this.setState(({taskData}) => {
      const idx = taskData.findIndex((item) => item.id === id);

      const oldItem = taskData[idx];
      const newItem = { 
        ...oldItem, 
        completed: !oldItem.completed 
      };

      const newArray = [
        ...taskData.slice(0, idx),
        newItem,
        ...taskData.slice(idx + 1)
      ];
      
      return {taskData: newArray};
    });
  }

  addItem = (text) => {
    const newTask = this.createTaskItem(text);

    this.setState(({taskData}) => {
      const newArr = [
        ...taskData,
        newTask
      ];

      return {
        taskData: newArr
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({taskData}) => {
      const idx = taskData.findIndex((item) => item.id === id);
      const newArray = [
        ...taskData.slice(0, idx),
        ...taskData.slice(idx + 1)
      ];

      return {taskData: newArray};
    });
  }

  onFilterChange = (name) => {
    this.setState({
      filter: name
    });
  }

  filterItems = (taskData, filter) => {
    if (filter === 'all') {
      return taskData;
    } else if (filter === 'active') {
      return taskData.filter(el => !el.completed);
    } else if (filter === 'completed') {
      return taskData.filter(el => el.completed);
    }
  }

  clearCompletedItems = () => {
    this.setState(({taskData}) => {
      const newArr = taskData.filter(el => !el.completed);
      
      return {
        taskData: newArr
      }
    });
  }

  render() {
    const {taskData, filter} = this.state;
    const filteredItems = this.filterItems(taskData, filter);

    const activeTaskCounter = taskData.filter(el => !el.completed).length;
  
    return (
      <section className='todoapp'>
        <Header onItemAdded={this.addItem} />
        <TaskList 
          tasks={filteredItems}
          onComplete={this.onComplete} 
          onDelete={this.deleteItem}
        />
        <Footer 
          taskCounter={activeTaskCounter} 
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.clearCompletedItems}
        />
      </section>
    );
  }

}

