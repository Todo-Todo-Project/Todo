import "./TodoList.css";
import TodoItem from "../TodoItem";
import AddTodo from "./../AddTodo/addTodo"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AiOutlinePlus } from 'react-icons/ai';


function TodoList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      if (!isLoaded) {
        loadAllTodos();
      }
    }, [isLoaded]);

    function loadAllTodos() {
        // console.log("loadAllTodos");
        const authString = localStorage.getItem("authInfo");
        const accessToken = authString && JSON.parse(authString).accessToken;
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        fetch(`${process.env.REACT_APP_API_URL}/todos`, { headers })
            .then((res) => {
                console.log(res);
                if (res.status === 401) {
                    setError("Unauthorized");
                    navigate("/login");
                    return;
                }
                return res.json();
            })
            .then(
                (res) => {
                    setIsLoaded(true);
                    setTodos(res);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    function handleToggleTodoItem(todo) {
        const accessToken =
            localStorage.getItem("authInfo") &&
            localStorage.getItem("authInfo").accessToken;
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        fetch(`${process.env.REACT_APP_API_URL}/todos/${todo._id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted }),
        })
            .then((res) => res.json())
            .then(
                (res) => {
                    setIsLoaded(true);
                    loadAllTodos();
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
              <div className="todolist_addTodo" onClick={()=> console.log("ddddd")}>
                Add new Todo
               <AddTodo></AddTodo>
              </div>
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            name={todo.name}
                            isCompleted={todo.isCompleted}
                            id={todo._id}
                            onToggle={() => handleToggleTodoItem(todo)}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
