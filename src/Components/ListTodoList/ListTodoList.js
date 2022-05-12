// import "./TodoList.css";
// import TodoItem from "../TodoItem";
// import AddTodo from "./../AddTodo/addTodo";
import AddList from "../AddList/AddList";
import ListItem from "../ListItem/ListItem";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { SidebarData } from '../Sidebar/SidebarData';

import "./ListTodoList.css";
import { propTypes } from "react-bootstrap/esm/Image";
import Sidebar from "../Sidebar/Sidebar";

function ListTodoList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lists, setLists] = useState([]);
    const [listId, setListId] = useState("");
    const [rerender, setRerender] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("listtodolist");
        loadAllTodos();
    }, [isLoaded, rerender]);

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
            <>
            <div>
                <div className="list_todolist_add_list row">
                    <h4 className="col-9 font-bold"></h4>
                    <div className="col">
                        {" "}
                        <AddList
                            addNewListCallBack={addNewListCallBack}
                        ></AddList>
                    </div>
                </div>
                <ul className="list-list">
                     {SidebarData.map((item, index) => {
                            return (
                                <ListItem 
                                itemOfListCallBack={itemOfListCallBack}
                                listItemDeleteCallBack={listItemDeleteCallBack}
                                listItemEditCallBack={listItemEditCallBack}
                                key={item._id}
                                name={item.title}
                                id={item._id}
                                icon={item.icon}
                                ></ListItem>
                            );
                        })}

                    {lists.length === undefined ? (
                        <></>
                    ) : (
                        lists.map((list) => (
                            <ListItem
                                itemOfListCallBack={itemOfListCallBack}
                                listItemDeleteCallBack={listItemDeleteCallBack}
                                listItemEditCallBack={listItemEditCallBack}
                                key={list._id}
                                name={list.listName}
                                id={list._id}
                            />
                        ))
                    )}
                </ul>
            </div>
            </>
        );
    }

    function itemOfListCallBack(listId) {
        setListId(listId);
        props.idOfListCallBack(listId);
    }

    function addNewListCallBack() {
        setRerender(!rerender);
    }

    function listItemDeleteCallBack() {
        setRerender(!rerender)
    }

    function listItemEditCallBack() {
        setRerender(!rerender)
    }
}

export default ListTodoList;
