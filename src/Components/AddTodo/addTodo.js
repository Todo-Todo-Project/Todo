import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from 'axios';

import "./addTodo.css"

function AddTodo(props) {
    const [newTodoList, setNewTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState(new Todo());
    let newTodoListElement = [];
    newTodoListElement.push(
        <div>
            <div className="add_new_todo_name">
                <h5>Name</h5>
                <input
                    type="text"
                    placeholder={newTodo.name}
                    className="border-2 border-gray-500"
                    onChange={(input) => {
                        let tempTodo = { ...newTodo };
                        tempTodo.name = input.target.value;
                        setNewTodo(tempTodo);
                    }}
                ></input>
            </div>
            <div className="add_new_todo_date">
                <h5>Expired Date</h5>
                <input
                    type="date"
                    className="border-2 border-gray-500"
                    value={ConvertDateToDisplayDate(newTodo.duedate)}
                    onChange={(input) => {
                        let tempTodo = { ...newTodo };
                        tempTodo.duedate = input.target.value;
                        setNewTodo(tempTodo);
                    }}
                ></input>
            </div>

            <div className="add_new_todo_priority drop-down">
                <h5>Priority</h5>
                <DropdownButton
                    className="drop-down-button bg-blue-500 w-max"
                    id="dropdown-basic-button"
                    title={newTodo.priority}
                >
                    <Dropdown.Item
                        onClick={() => {
                            let tempTodo = { ...newTodo };
                            tempTodo.priority = "Low";
                            setNewTodo(tempTodo);
                        }}
                    >
                        Low
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => {
                            let tempTodo = { ...newTodo };
                            tempTodo.priority = "Medium";
                            setNewTodo(tempTodo);
                        }}
                    >
                        Medium
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => {
                            let tempTodo = { ...newTodo };
                            tempTodo.priority = "High";
                            setNewTodo(tempTodo);
                        }}
                    >
                        High
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => {
                            let tempTodo = { ...newTodo };
                            tempTodo.priority = "Urgent";
                            setNewTodo(tempTodo);
                        }}
                    >
                        Urgent
                    </Dropdown.Item>
                </DropdownButton>
            </div>

            <div className="add_new_todo_content">
                <h5>Description</h5>
                <input
                    type="text"
                    className="border-2 border-gray-500"
                    value={newTodo.description}
                    onChange={(input) => {
                        let tempTodo = { ...newTodo };
                        tempTodo.description = input.target.value;
                        setNewTodo(tempTodo);
                    }}
                ></input>
            </div>
        </div>
    );

    function savingTodos () {
        let user = JSON.parse(localStorage.authInfo).user
        console.log(localStorage.authInfo);
        let i = newTodoList.length-1;
        {
            newTodoList[i].ownerId = user._id;
            newTodoList[i].listId  =  props.listId;
            axios.post('http://localhost:3000/todos',newTodoList[i]).then((res)=> console.log(res))
        }
        props.callBackWhenTodoWasAdded();
    }

    return (
        <Popup
            className="add_new_todo_popup"
            position="middle center"
            modal
            nested
            trigger={
                <button className="AiOutlinePlus">
                    <AiOutlinePlus onClick={() => console.log("clicked")}>
                        {" "}
                    </AiOutlinePlus>
                </button>
            }
        >
            {(close) => (
                <div className="add_new_todo_popup">
                    <div className="add_new_todo_popup_title modal-header">
                        <h2 className="font-bold">Add new todo</h2>
                    </div>
                    <div className="add_new_todo_popup_body modal-body">
                        {newTodoListElement}
                    </div>
                    <div className="add_new_todo_popup_footer modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary bg-blue-500"
                            onClick= {() => {
                                if (newTodo.name === "") {
                                    alert("Todo name can not be empty")
                                    return
                                }
                                let newTodoListTemp = [...newTodoList];
                                newTodoListTemp.push(newTodo);
                                console.log(newTodo);

                                setNewTodoList(newTodoListTemp);
                                console.log(newTodoListTemp);

                                setNewTodo(new Todo());
                                savingTodos();
                                close();} 
                        }
                        >
                            SUBMIT
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => {
                                close();
                            }}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default AddTodo;

class Todo {
    ownerId = "";
    listId = "";
    name = "my todo";
    priority = "Normal";
    description = "";
    creationdate = new Date();
    duedate = new Date();
    isCompleted = false;
}

function ConvertDateToDisplayDate(inputDate) {
    let tempDate = new Date(inputDate);
    let outputDate = tempDate.getFullYear() + "-";
    if (tempDate.getMonth() + 1 < 10) {
        outputDate += "0" + (tempDate.getMonth() + 1) + "-";
    } else {
        outputDate += tempDate.getMonth() + 1 + "-";
    }

    if (tempDate.getDate() < 10) {
        outputDate += "0" + tempDate.getDate();
    } else outputDate += tempDate.getDate();
    return outputDate;
}
