import { AiOutlineEdit } from "react-icons/ai";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function EditList(props) {
    const [list, setList] = useState(new List());

    useEffect(() => {
        let user = JSON.parse(localStorage.authInfo).user;
        axios.get("http://localhost:3000/lists/lists/" + user.email).then((res) => {
            setList(res.data[0]);
            console.log(res.data[0])
        });
    });

    function updateList() {
        axios
            .put("http://localhost:3000/lists/" + props.id, list)
            .then((res) => console.log(res));
    }

    return (
        <Popup
            className="add_new_todo_popup"
            position="middle center"
            modal
            nested
            trigger={
                <button className="AiOutlinePlus">
                    <AiOutlineEdit onClick={() => {}}> </AiOutlineEdit>
                </button>
            }
        >
            {(close) => (
                <div className="edit_list_popup">
                    <div className="edit_list_popup_title modal-header">
                        <h2>Edit list</h2>
                    </div>
                    <div className="edit_list_name_popup_body modal-body">
                        <div>
                            <div className="edit_list_name">
                                <h5>Name</h5>
                                <input
                                    type="text"
                                    placeholder={list.listName}
                                    onChange={(input) => {
                                        let listTemp = { ...list };
                                        listTemp.listName = input.target.value;
                                        setList(listTemp);
                                        console.log(list);
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
                            onClick={() => {
                                updateList();
                                window.location.reload();
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

export default EditList;

class List {
    ownerId = "";
    listName = "my todo";
    todos = [];
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
