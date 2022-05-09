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
    const navigate = useNavigate();

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

        let user = JSON.parse(localStorage.authInfo).user;
        let ownerId = user._id;
        fetch(`${process.env.REACT_APP_API_URL}/lists/${ownerId}`, { headers })
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
                    console.log(res);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    function deleteListTodo() {
        console.log(lists);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="list_todolist_addList">
                    Add new list
                    <AddList></AddList>
                </div>
                <ul className="list-list">
                    {lists.length === undefined ? (
                        <h1>Have no list here</h1>
                    ) : (
                        lists.map((list) => (
                            <ListItem
                                key={list._id}
                                name={list.listName}
                                id={list._id}
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
