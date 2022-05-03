import "./TodoList.css";
import TodoItem from "../TodoItem";
import AddTodo from "./../AddTodo/addTodo";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function TodoList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todos, setTodos] = useState([]);
    const [listDelete, setListDelete] = useState([]);
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
        console.log("loadAllTodos");
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

    function deleteListTodo() {
        for (let i = 0; i < listDelete.length; i++) {
            axios
                .delete("http://localhost:3000/todos/" + listDelete[i])
                .then((res) => console.log(res));
        }
        window.location.reload();
    }
    // sortDeByName(todos);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <button onClick={()=> {
                    setTodos([...sortByPriority(todos,true)])
                }}>
                    button demo sort
                </button>
                <div
                    className="todolist_addTodo"
                    onClick={() => console.log("ddddd")}
                >
                    Add new Todo
                    <AddTodo></AddTodo>
                    <BsFillTrashFill
                        onClick={() => deleteListTodo()}
                    ></BsFillTrashFill>
                </div>
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <TodoItem
                            callBackWhenCheckedIsFalse={callBackCheckedIsFalse}
                            callBackWhenCheckedIsTrue={callBackCheckedIsTrue}
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

    function callBackCheckedIsFalse(id) {
        let index = listDelete.indexOf(id);
        if (index !== -1) {
            listDelete.splice(index, 1);
        }
    }

    function callBackCheckedIsTrue(id) {
        listDelete.push(id);
    }
}

export default TodoList;

function sortByPriority(arr, isIn) {
    let lowArry = [];
    let normalArray = [];
    let hightArry = [];
    let ugentArray = [];
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i].priority === "Low") {
            lowArry.push(arr[i]);
        }
        if (arr[i].priority === "Normal") {
            normalArray.push(arr[i]);
        }
        if (arr[i].priority === "High") {
            hightArry.push(arr[i]);
        }
        if (arr[i].priority === "Urgent") {
            ugentArray.push(arr[i]);
        }
    }

    if (isIn === true) {
        const sortedList = lowArry
            .concat(normalArray)
            .concat(hightArry)
            .concat(ugentArray);
        return sortedList;
    }

    if (isIn === false) {
        const sortedList = ugentArray
            .concat(hightArry)
            .concat(normalArray)
            .concat(lowArry);
        return sortedList;
    }
}
//==========================================================
function sortDeByCreationDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(b.creationdate) - new Date(a.creationdate);
    });
    return sorted;
}

function sortInByCreationDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(a.creationdate) - new Date(b.creationdate);
    });
    return sorted;
}

function sortDeByDueDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(b.duedate) - new Date(a.duedate);
    });
    return sorted;
}

function sortInByDueDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(a.duedate) - new Date(b.duedate);
    });
    return sorted;
}
//===========================================================

function sortInByName(arr) {
    let sorted = arr.sort((a, b) => 
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    console.log(sorted)
    return sorted;
}

function sortDeByName(arr) {
    let sorted = arr.sort((b, a) => 
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    console.log(sorted)
    return sorted;
}

//=========================================================