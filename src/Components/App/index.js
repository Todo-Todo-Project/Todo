import "./App.css";
import { Navbar } from "react-bootstrap";

import TodoList from "../TodoList";
import ListTodoList from "../ListTodoList/ListTodoList";
import TodoDetail from "../TodoDetail/TodoDetail";
import { useEffect, useState } from "react";

function App() {
    let user = JSON.parse(localStorage.authInfo).user;
    const [listId, setListId] = useState("");
    const [todoId, setTodoId] = useState("");
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
                <div className="col list_of_list_todo">
                    <ListTodoList idOfListCallBack={idOfListCallBack}/>
                </div>
                <div className="col list_of_todo">
                    <TodoList listId={listId} idOfTodoCallBack={idOfTodoCallBack}/>
                </div>
                <div className="col todo_detail">
                    <TodoDetail id={todoId}/>
                </div>
            </div>
        </div>
    );

    function idOfListCallBack(listId) {
        setListId(listId);
    }

    function idOfTodoCallBack(todoId) {
        setTodoId(todoId)
        console.log(todoId)
    }
}

export default App;
