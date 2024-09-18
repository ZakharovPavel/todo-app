import { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {

  state = {
    description: ''
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.description);
    this.setState({
      description: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" 
          onChange={this.onDescriptionChange}
          placeholder="What need to be done?"
          value={this.state.description}
          autoFocus 
        />
      </form>
    );
  }

}

