import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const TodoField = ({
  message,
  updateTodo,
}) => {
  const [term, setTerm] = useState(message);
  const timer = useRef();

  const handleUpdate = (value) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setTerm(value);
    if (value) {
      timer.current = setTimeout(() => {
        updateTodo(value);
      }, 1000);
    }
  };

  useEffect(() => () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  return (
    <div className="todo-field">
      <input
        value={term}
        onChange={(e) => handleUpdate(e.target.value)}
      />
    </div>
  );
};

TodoField.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoField;
