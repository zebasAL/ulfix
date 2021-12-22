import React from 'react';
import PropTypes from 'prop-types';

const TodoField = ({
  todo,
  setTodo,
}) => (
  <div className="todo-field">
    <input value={todo} onChange={(e) => setTodo(e.target.value)} />
  </div>
);

TodoField.propTypes = {
  todo: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  setTodo: PropTypes.func.isRequired,
};

export default TodoField;
