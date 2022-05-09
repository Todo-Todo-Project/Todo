import EditList from "../EditList/editList";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

function ListItem(props) {
    function deleteList() {
        axios
            .delete("http://localhost:3000/lists/", { data: { _id: props.id } })
            .then((res) => console.log(res));
    }

    function itemOfListCallback() {
        props.itemOfListCallBack(props.id)
    }

    return (
        <div
            className="row"
            onClick={() => {
                itemOfListCallback();
            }}
        >
            <div className="col-7">{props.name}</div>
            <div className="col">
                <EditList id={props.id} editListCallBack={editListCallBack}></EditList>
                <BsFillTrashFill
                    onClick={() => {
                        deleteList();
                        props.listItemDeleteCallBack()
                    }}
                ></BsFillTrashFill>
            </div>
        </div>
    );

    function editListCallBack() {
        props.listItemEditCallBack();
    }
}

export default ListItem;
