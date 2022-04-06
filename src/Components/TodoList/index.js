import './TodoList.css';
import TodoItem from '../TodoItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    loadAllTodos();
  }, []);

  function loadAllTodos() {
    const authString = localStorage.getItem('authInfo');
    const accessToken = authString && JSON.parse(authString).accessToken;
    const headers = { 'Content-Type': 'application/json' };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    fetch(`${process.env.REACT_APP_API_URL}/todos`, { headers })
      .then(res => {
        if (res.status === 401) {
          setError('Unauthorized');
          navigate('/login');
          return;
        }
        return res.json()})
      .then(
        (result) => {
          setIsLoaded(true);
          setTodos(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }

  function handleToggleTodoItem(todo) {
    const accessToken = localStorage.getItem('authInfo') && localStorage.getItem('authInfo').accessToken;
    const headers = { 'Content-Type': 'application/json' };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    fetch(`${process.env.REACT_APP_API_URL}/todos/${todo._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          loadAllTodos();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul className="todo-list">
      {todos.map(todo => <TodoItem key={todo._id} name={todo.name} isCompleted={todo.isCompleted}
                                   id={todo._id} onToggle={() => handleToggleTodoItem(todo)} />)}
    </ul>;
  }
}

export default TodoList;