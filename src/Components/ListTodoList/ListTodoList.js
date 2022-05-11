// import "./TodoList.css";
// import TodoItem from "../TodoItem";
// import AddTodo from "./../AddTodo/addTodo";
import AddList from "../AddList/AddList";
import ListItem from "../ListItem/ListItem";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from "axios";

import "./ListTodoList.css";
import { propTypes } from "react-bootstrap/esm/Image";

function ListTodoList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lists, setLists] = useState([]);
    const [listId, setListId] = useState("");
    const [rerender, setRerender] = useState(false);
    const navigate = useNavigate();
    const [dragandrop, setDragandrop] = useState(false);
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

    function handleOnDragEnd(result){
        if(!result.destination) return;
        
        const item = Array.from(lists);
        const [reorderedItem] = item.splice(result.source.index, 1);
        item.splice(result.destination.index, 0, reorderedItem);
        setLists(item);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="list_todolist_add_list row">
                    <h4 className="col-7">Add new list</h4>
                    <div className="col">
                        {" "}
                        <AddList
                            addNewListCallBack={addNewListCallBack}
                        ></AddList>
                        <input type="checkbox" onChange={() => setDragandrop(!dragandrop)} value={dragandrop}></input>
                    </div>
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="move_listName">
                        {(provided) => (
                             <div className="list-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                 lists?.map((list, index) => (
                                     
                                     <Draggable key={list._id} index={index} draggableId={list._id} isDragDisabled={dragandrop}>
                                         {(provided) => (
                                             <div
                                             ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}         
                                            >
                                                <ListItem 
                                                itemOfListCallBack={itemOfListCallBack}
                                                listItemDeleteCallBack={listItemDeleteCallBack}
                                                listItemEditCallBack={listItemEditCallBack}
                                                name={list.listName}
                                                id={list._id}
                                                />
                                            </div>
                                        
                                         )}
                                     </Draggable>
                                 ))
                            }
                             {provided.placeholder}
                         </div>
                        )}
                   
                    </Droppable>
                </DragDropContext>
                
            </div>
        );
    }

    function itemOfListCallBack(listId) {
        setListId(listId);
        console.log(listId);
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
