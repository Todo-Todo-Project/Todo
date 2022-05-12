import { AiOutlineEdit } from "react-icons/ai";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ToggleButton from "react-toggle-button";

function EditTodo(props) {
    const [newTodo, setNewTodo] = useState(new Todo());
    // useEffect(() => {
    //     axios.get("");
    // });

    function updateTodo() {
        axios
            .put("http://localhost:3000/todos/" + props.id, newTodo)
            .then((res) => console.log(res));
        props.callBackWhenTodoWasEdited();
    }

    return (
        <Popup
            className="add_new_todo_popup"
            position="middle center"
            modal
            nested
            trigger={
                <button className="AiOutlinePlus">
                    <AiOutlineEdit
                        onClick={() => {
                            axios
                                .get(
                                    "http://localhost:3000/todos/todo/" +
                                        props.id
                                )
                                .then((res) => {
                                    setNewTodo(res.data[0]);
                                });
                        }}
                    >
                        {" "}
                    </AiOutlineEdit>
                </button>
            }
        >
            {(close) => (
                <div className="add_new_todo_popup">
                    <div className="add_new_todo_popup_title modal-header">
                        <h2>Edit new todo</h2>
                        <ToggleButton
                            value={newTodo.isCompleted}
                            onToggle={(value) => {
                                let todoTemp = { ...newTodo };
                                todoTemp.isCompleted = !value;
                                setNewTodo(todoTemp);
                            }}
                        />
                    </div>
                    <div className="add_new_todo_popup_body modal-body">
                        <div>
                            <div className="add_new_todo_name">
                                <h5>Name</h5>
                                <input
                                    type="text"
                                    value={newTodo.name}
                                    placeholder={newTodo.name}
                                    className="border-2 border-bray-500"
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
                                    className="border-2 border-bray-500"
                                    value={ConvertDateToDisplayDate(
                                        newTodo.duedate
                                    )}
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
                                    value={newTodo.description}
                                    className="border-2 border-bray-500"
                                    onChange={(input) => {
                                        let tempTodo = { ...newTodo };
                                        tempTodo.description =
                                            input.target.value;
                                        setNewTodo(tempTodo);
                                    }}
                                ></input>
                            </div>

                            <br></br>
                            <br></br>
                        </div>
                    </div>
                    <div className="add_new_todo_popup_footer modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary bg-blue-500"
                            // onClick={() => {savingTodos()}}
                            onClick={() => {
                                updateTodo();
                                close();
                            }}
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

export default EditTodo;

class Todo {
    email = "";
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
