import { AiOutlineEdit } from "react-icons/ai";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ToggleButton from "react-toggle-button";

function EditTodo() {
    const [newTodo, setNewTodo] = useState(new Todo());
    const [isCompleted, setCompleted] = useState(false)
    // useEffect(() => {
    //     axios.get("");
    // });

    return (
        <Popup
            className="add_new_todo_popup"
            position="middle center"
            modal
            nested
            trigger={
                <button className="AiOutlinePlus">
                    <AiOutlineEdit onClick={() => console.log("clicked")}>
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
                            value={isCompleted}
                            onToggle={(value) => {
                               setCompleted(!value)
                            }}
                        />
                    </div>
                    <div className="add_new_todo_popup_body modal-body">
                        <div>
                            <div className="add_new_todo_name">
                                <h5>Name</h5>
                                <input
                                    type="text"
                                    placeholder={newTodo.name}
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
                                    value={ConvertDateToDisplayDate(
                                        newTodo.dueDate
                                    )}
                                    onChange={(input) => {
                                        let tempTodo = { ...newTodo };
                                        tempTodo.dueDate = input.target.value;
                                        setNewTodo(tempTodo);
                                    }}
                                ></input>
                            </div>

                            <div className="add_new_todo_priority drop-down">
                                <h5>Priority</h5>
                                <DropdownButton
                                    className="drop-down-button"
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
                            className="btn btn-primary"
                            // onClick={() => {savingTodos()}}
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
