import EditTodo from "../EditTodo/editTodo";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { useEffect } from "react";
import "./TodoItem.css";

function TodoItem(props) {
    function deleteTodo() {
        axios
            .delete("http://localhost:3000/todos/" + props.id)
            .then((res) => console.log(res));
        callBackWhenTodoWasDeleted();
    }

    function callBackWhenCheckedIsFalse() {
        props.callBackWhenCheckedIsFalse(props.id);
    }

    function callBackWhenCheckedIsTrue() {
        props.callBackWhenCheckedIsTrue(props.id);
    }

    function callBackWhenTodoWasEdited() {
        props.callBackWhenTodoWasEdited();
    }

    function callBackWhenTodoWasDeleted() {
        props.callBackWhenTodoWasDeleted();
    }

    function idOfTodoCallBack() {
        props.idOfTodoCallBack(props.id);
    }

    return (
        <div className={`row todo_item todo_item_priority_${props.priority}`} draggable>
            <div className="col-3 row todo_item_checkbox_group">
                <input
                    className="todo_item_checkbox"
                    type="checkbox"
                    onChange={(input) => {
                        if (input.target.checked) {
                            callBackWhenCheckedIsTrue();
                        }

                        if (!input.target.checked) {
                            callBackWhenCheckedIsFalse();
                        }
                    }}
                />

                <input
                    className="todo_item_checkbox"
                    type="checkbox"
                    checked={props.isCompleted}
                    onChange={props.onToggle}
                />
            </div>

            <div className="col-7" onClick={() => idOfTodoCallBack()}>
                {props.name}
            </div>
            <div className="col-2">
                <EditTodo
                    id={props.id}
                    callBackWhenTodoWasEdited={callBackWhenTodoWasEdited}
                ></EditTodo>
                <BsFillTrashFill
                    onClick={() => {
                        deleteTodo();
                    }}
                ></BsFillTrashFill>
            </div>
        </div>
    );
}

export default TodoItem;
