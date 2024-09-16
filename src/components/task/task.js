import "./task.css";

const Task = ({description, created, onComplete, onDelete}) => {

  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description"
          onClick={onComplete}>
          {description}
        </span>
        <span className="created">{created}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button 
        className="icon icon-destroy"
        onClick={onDelete}></button>
    </div>
  );
}

export default Task;

// export default class Task extends Component {
//   // = ({description, created, editing = false, completed = false}) =>

//   // state = {
//   //   completed: false,
//   // };

//   onDescriptionClick = () => {
//     this.setState((prevState) => {
//       console.log('123');
//       return {
//         completed: !prevState.completed
//       }
//     })
//   }

//   render() {
//     const { description, created, onComplete } = this.props;
//     // const { completed } = this.state;

//     return (
//       <div className="view">
//         <input className="toggle" type="checkbox" />
//         <label>
//           <span className="description"
//             onClick={onComplete}
//             // onClick={console.log('123')}
//             // onClick={this.onDescriptionClick}
//             >
//             {description}
//           </span>
//           <span className="created">{created}</span>
//         </label>
//         <button className="icon icon-edit"></button>
//         <button className="icon icon-destroy"></button>
//       </div>
//     );
//   }
// }
