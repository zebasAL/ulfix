import React, { useState, useEffect, useContext } from 'react';
import { DeleteIcon, toaster, Spinner } from 'evergreen-ui';
import TodoField from '../components/TodoField';
import TextField from '../components/TextField';
import { Todos, FirebaseContext } from '../Firebase';
import '../App.css';

const Profile = () => {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState('');
  const { user } = useContext(FirebaseContext);

  const submitTodo = () => {
    const newTodo = {
      message: value,
      email: user.email,
    };
    newTodo.created_at = Date.now().toString();
    Todos.createTodo(newTodo)
      .then(() => {
        if (newTodo?.key) {
          toaster.success('Your todo was updated');
        } else {
          toaster.success('Your todo was created');
        }
        setValue('');
      })
      .catch(() => {
        toaster.warning('Something went wrong');
      });
  };

  const updateTodo = (key, message) => {
    const [todo] = todos.filter((item) => item.key === key);
    todo.message = message;
    Todos.updateOrDestroyTodo(todo, key)
      .then(() => {
        toaster.success('Your todo was updated');
      })
      .catch(() => {
        toaster.warning('Something went wrong');
      });
  };

  const deleteTodo = (key) => {
    Todos.updateOrDestroyTodo(null, key)
      .then(() => {
        toaster.notify('Your todo was deleted');
      })
      .catch(() => {
        toaster.warning('Something went wrong');
      });
  };

  useEffect(() => {
    let unsubscribeTodoList;
    if (user?.email) {
      unsubscribeTodoList = Todos.getTodos(user.email, (snapshot) => {
        setLoaded(true);
        if (snapshot.val()) {
          const data = Object.entries(snapshot.val());
          const listOfTodos = data.map(([key, item]) => ({ key, ...item }));
          setTodos(listOfTodos.sort((a, b) => b.created_at - a.created_at));
        } else {
          setTodos([]);
        }
      });
    }
    return () => {
      if (unsubscribeTodoList) {
        unsubscribeTodoList();
      }
    };
  }, [user?.email]);

  if (!user?.email || !loaded) return <Spinner />;

  return (
    <div className="todos-list-container">
      <p className="welcome-header">{`Welcome, ${user.email}`}</p>
      <TextField
        value={value}
        setValue={(v) => setValue(v)}
        onSubmit={submitTodo}
        label="Type a new todo and press 'Enter'"
        type="text"
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.key}>
            <TodoField
              message={todo.message}
              updateTodo={(term) => updateTodo(todo.key, term)}
            />
            <DeleteIcon className="delete-todo-button" type="button" color="muted" onClick={() => deleteTodo(todo.key)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
