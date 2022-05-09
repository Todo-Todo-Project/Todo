import EditList from "../EditList/editList";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function ListItem(props) {
    function deleteList() {
        axios
            .delete("http://localhost:3000/lists/", { data: { _id: props.id } })
            .then((res) => console.log(res));
    }

    return (
        <div className="row" onClick={()=> {}}>
            <div className="col-7" >{props.name}</div>
            <div className="col">
                <EditList id={props.id}></EditList>
                <BsFillTrashFill
                    onClick={() => {
                        deleteList();
                        window.location.reload();
                    }}
                ></BsFillTrashFill>
            </div>
        </div>
    );
}

export default ListItem;
