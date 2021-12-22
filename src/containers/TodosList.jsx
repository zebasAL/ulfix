import React, { useState, useEffect } from 'react';
import TodoField from '../components/TodoField';
import { firebaseQueries } from '../Firebase';
import '../App.css';

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const submitTodo = () => {
    const newTodo = {
      message: 'hello2',
    };
    newTodo.created_at = Date.now().toString();
    firebaseQueries.createTodo(newTodo)
      .then(() => {
        if (newTodo?.key) {
          alert('Todo updated');
        } else {
          alert('Todo created');
        }
      })
      .catch(() => {
        alert('Ha ocurrido un error');
      });
  };

  const updateTodo = (key) => {
    const newTodo = {
      message: 'actualizado',
    };
    firebaseQueries.updateOrDestroyTodo(newTodo, key)
      .then(() => {
        alert('Todo updated');
      })
      .catch(() => {
        alert('Ha ocurrido un error');
      });
  };

  const deleteTodo = (key) => {
    firebaseQueries.updateOrDestroyTodo(null, key)
      .then(() => {
        alert('Todo deleted');
      })
      .catch(() => {
        alert('Ha ocurrido un error');
      });
  };

  useEffect(() => {
    const unsubscribeTodoList = firebaseQueries.getTodos(null, (snapshot) => {
      const data = Object.entries(snapshot.val());
      setTodos(data.map(([key, item]) => ({ key, ...item })));
    });
    return () => unsubscribeTodoList();
  }, []);

  return (
    <div className="App">
      <button type="button" onClick={submitTodo}>create</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.key}>
            {todo.message}
            <button type="button" onClick={() => updateTodo(todo.key)}>update</button>
            <button type="button" onClick={() => deleteTodo(todo.key)}>delete</button>
          </li>
        ))}
        <TodoField todo={value} setTodo={setValue} />
      </ul>
    </div>
  );
};

export default TodosList;
