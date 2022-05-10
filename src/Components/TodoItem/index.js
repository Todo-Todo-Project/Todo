import EditTodo from "../EditTodo/editTodo";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { useEffect } from "react";

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
        <div className="row">
            <div className="col row">
                <div className="col">
                    <input
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
                </div>
                <div className="col">
                    <input
                        type="checkbox"
                        checked={props.isCompleted}
                        onChange={props.onToggle}
                    />
                </div>
            </div>

            <div className="col-5" onClick={()=>idOfTodoCallBack()}>{props.name}</div>
            <div className="col">
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
