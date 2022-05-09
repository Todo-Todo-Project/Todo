import "./App.css";
import { Navbar } from "react-bootstrap";

import TodoList from "../TodoList";
import ListTodoList from "../ListTodoList/ListTodoList";
import { useEffect, useState } from "react";

function App() {
    let user = JSON.parse(localStorage.authInfo).user;
    const [listId, setListId] = useState(user._id);

    return (
        <div className="document">
            <div className="navb">
                <Navbar className="navbar">
                    <Navbar.Brand href="#home">
                        <div className="todo-title">Todo Todo</div>
                    </Navbar.Brand>
                </Navbar>
            </div>
            <div className="body-content row">
                <div className="col">
                    <ListTodoList idOfListCallBack={idOfListCallBack}/>
                </div>
                <div className="col">
                    <TodoList listId={listId}/>
                </div>
                <div className="col">
                    <TodoList />
                </div>
            </div>
        </div>
    );

    function idOfListCallBack(listId) {
        setListId(listId);
    }
}

export default App;
