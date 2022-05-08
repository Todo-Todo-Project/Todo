import EditTodo from "../EditTodo/editTodo";
import EditList from "../EditList/editList";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function ListItem(props) {
    function deleteList() {
        console.log(props.id)
        axios
            .delete("http://localhost:3000/lists/" + props.id)
            .then((res) => console.log(res));
    }

    return (
        <li>
            <div>{props.name}</div>
            <EditList id={props.id}></EditList>
            <BsFillTrashFill
                onClick={() => {
                    deleteList();
                    // window.location.reload();
                }}
            ></BsFillTrashFill>
        </li>
    );
}

export default ListItem;
