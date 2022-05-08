// import "./TodoList.css";
// import TodoItem from "../TodoItem";
// import AddTodo from "./../AddTodo/addTodo";
import AddList from "../AddList/AddList";
import ListItem from "../ListItem/ListItem";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function ListTodoList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lists, setLists] = useState([]);
    const [listDelete, setListDelete] = useState([]);
    const navigate = useNavigate();

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        console.log("listtodolist");
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
        fetch(`${process.env.REACT_APP_API_URL}/lists`, { headers })
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
                    setLists(res);
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

    // function deleteListTodo() {
    //     for (let i = 0; i < listDelete.length; i++) {
    //         axios
    //             .delete("http://localhost:3000/todos/" + listDelete[i])
    //             .then((res) => console.log(res));
    //     }
    //     window.location.reload();
    // }
    // sortDeByName(todos);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {/* <button onClick={()=> {
                    setTodos([...sortByPriority(todos,true)])
                }}>
                    button demo sort    
                </button> */}
                <div className="list_todolist_addList">
                    Add new list
                    <AddList></AddList>
                    <BsFillTrashFill
                    // onClick={() => deleteListTodo()}
                    ></BsFillTrashFill>
                </div>
                <ul className="list-list">
                    {lists.length === undefined ? (
                        <h1>Have no list here</h1>
                    ) : (
                        lists.map((list) => (
                            <ListItem
                                key={list._id}
                                name={list.listName}
                                isCompleted={list.isCompleted}
                                id={list._id}
                                onToggle={() => handleToggleTodoItem(list)}
                            />
                        ))
                    )}
                </ul>
            </div>
        );
    }

    // function callBackCheckedIsFalse(id) {
    //     let index = listDelete.indexOf(id);
    //     if (index !== -1) {
    //         listDelete.splice(index, 1);
    //     }
    // }

    // function callBackCheckedIsTrue(id) {
    //     listDelete.push(id);
    // }
}

export default ListTodoList;
