import "./TodoList.css";
import TodoItem from "../TodoItem";
import AddTodo from "./../AddTodo/addTodo";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function TodoList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todos, setTodos] = useState([]);
    const [listDelete, setListDelete] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadAllTodos();
    }, [isLoaded, props.listId, reload]);

    function loadAllTodos() {
        const authString = localStorage.getItem("authInfo");
        const accessToken = authString && JSON.parse(authString).accessToken;
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        fetch(`${process.env.REACT_APP_API_URL}/todos/list/${props.listId}`, {
            headers,
        })
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
                <div className="todolist_addTodo row">
                    <h4 className="col-7">Add new Todo</h4>
                    <div className="col">
                        <AddTodo 
                            listId = {props.listId}
                            callBackWhenTodoWasAdded={callBackWhenTodoWasAdded}
                        ></AddTodo>
                        <BsFillTrashFill
                            onClick={() => deleteListTodo()}
                        ></BsFillTrashFill>
                    </div>
                    <div className="col">
                        <DropdownButton
                            className="drop-down-button"
                            id="dropdown-basic-button"
                            title="Sort"
                        >
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortByPriority(todos, false));
                                }}
                            >
                                Decrease priority
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortByPriority(todos, true));
                                }}
                            >
                                Increase priority
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortDeByCreationDate(todos));
                                }}
                            >
                                Decrease creation date
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortInByCreationDate(todos));
                                }}
                            >
                                Increase creation date
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortDeByDueDate(todos));
                                }}
                            >
                                Decrease due date
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortInByDueDate(todos));
                                }}
                            >
                                Increase due date
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortDeByName(todos));
                                }}
                            >
                                Decrease name
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setTodos(sortInByName(todos));
                                }}
                            >
                                Increase name
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <ul className="todo-list">
                    {todos.length === undefined ? (
                        <h1>Have no todo here</h1>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                callBackWhenCheckedIsFalse={
                                    callBackCheckedIsFalse
                                }
                                callBackWhenCheckedIsTrue={
                                    callBackCheckedIsTrue
                                }
                                callBackWhenTodoWasEdited={
                                    callBackWhenTodoWasEdited
                                }
                                callBackWhenTodoWasDeleted={
                                    callBackWhenTodoWasDeleted
                                }
                                idOfTodoCallBack={idOfTodoCallBack}
                                key={todo._id}
                                name={todo.name}
                                isCompleted={todo.isCompleted}
                                priority={todo.priority}
                                id={todo._id}
                                onToggle={() => handleToggleTodoItem(todo)}
                            />
                        ))
                    )}
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

    function callBackWhenTodoWasEdited() {
        setReload(!reload);
    }

    function callBackWhenTodoWasDeleted() {
        setReload(!reload);
    }

    function callBackWhenTodoWasAdded() {
        setReload(!reload);
    }

    function idOfTodoCallBack(todoId) {
        props.idOfTodoCallBack(todoId);
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
    let temp = [... sorted]
    return temp;
}

function sortInByCreationDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(a.creationdate) - new Date(b.creationdate);
    });
    let temp = [... sorted]
    return temp;
}

function sortDeByDueDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(b.duedate) - new Date(a.duedate);
    });
    let temp = [... sorted]
    return temp;
}

function sortInByDueDate(arr) {
    const sorted = arr.sort((a, b) => {
        return new Date(a.duedate) - new Date(b.duedate);
    });
    let temp = [... sorted]
    return temp;
}
//===========================================================

function sortInByName(arr) {
    let sorted = arr.sort((a, b) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    let temp = [... sorted]
    return temp;
}

function sortDeByName(arr) {
    let sorted = arr.sort((b, a) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    let temp = [... sorted]
    return temp;
}

//=========================================================
