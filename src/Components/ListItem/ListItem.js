import EditList from "../EditList/editList";
import { BsFillTrashFill, BsListStars } from "react-icons/bs";
import axios from "axios";
import './ListItem.css'
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
            className="list_item row"
            onClick={() => {
                itemOfListCallback();
            }}
        >        
            <div className="sub-nav-text">
                {(props.icon === undefined ? (
                    <>
                        <BsListStars></BsListStars>                    
                        <span>{props.name}</span>
                        <EditList id={props.id} editListCallBack={editListCallBack}></EditList>
                        <BsFillTrashFill
                            onClick={() => {
                            deleteList();
                            props.listItemDeleteCallBack()
                            }}
                        ></BsFillTrashFill>
                    </>
                ):(
                    <>
                        {props.icon} 
                        <span>{props.name}</span>

                    </>
                ))}
               
            </div>
        </div>
    );

    function editListCallBack() {
        props.listItemEditCallBack();
    }
}

export default ListItem;
