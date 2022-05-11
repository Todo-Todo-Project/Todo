import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function TodoDetail(props) {
    const [todo, setTodo] = useState("");
    function getTodo() {
        axios
            .get("http://localhost:3000/todos/todo/" + props.id)
            .then((res) => {
                setTodo(res.data[0]);
            });
    }

    useEffect(() => {
        getTodo();
    }, [props.id]);

    if (todo === undefined) {
        return (<h3>Choise todo to view detai</h3>);
    }

    if (todo !== undefined) {
        console.log(todo)
        return (
            <div>
                <h3>{todo.name}</h3>
                <div className="col">
                    <div className="row">
                        <div className="col-4">Priority:</div>
                        <div className="col-5">{todo.priority}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Description:</div>
                        <div className="col-5">{todo.description}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Creation date:</div>
                        <div className="col-5">{ConvertDateToDisplayDate(todo.creationdate)}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Due date:</div>
                        <div className="col-5">{ConvertDateToDisplayDate(todo.duedate)}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Status:</div>
                        <div className="col-5">{StatusPipe(todo.isCompleted)}</div>
                    </div>
                </div>
            </div>
        );
    }

    function StatusPipe(status) {
        if (status === true) {
            return "Completed"
        }
    
        if (status === false) {
            return "In Completed"
        }
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
}

export default TodoDetail;
