import EditTodo from "../EditTodo/editTodo";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function ListItem(props) {
    // function deleteTodo() {
    //     axios
    //         .delete("http://localhost:3000/todos/" + props.id)
    //         .then((res) => console.log(res));
    // }

    // function callBackWhenCheckedIsFalse () {
    //   props.callBackWhenCheckedIsFalse(props.id)
    // }

    // function callBackWhenCheckedIsTrue () {
    //   props.callBackWhenCheckedIsTrue(props.id)
    // }

    return (
        <li>
            <input
                type="checkbox"
                checked={props.isCompleted}
                onChange={props.onToggle}
            />
            <div>{props.name}</div>
            <EditTodo id={props.id}></EditTodo>
            <BsFillTrashFill
                onClick={() => {
                    // deleteTodo();
                    window.location.reload();
                }}
            ></BsFillTrashFill>
        </li>
    );
}

export default ListItem;
