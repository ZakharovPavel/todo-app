import PropTypes from "prop-types";
import NewTaskForm from "../new-task-form";

import './header.css';

const Header = ({onItemAdded = () => {}}) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={onItemAdded} />
    </header>
  );
}

Header.propTypes = {
  onItemAdded: PropTypes.func
}

export default Header;