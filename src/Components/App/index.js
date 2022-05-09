import "./App.css";
import {Navbar} from "react-bootstrap";

import TodoList from "../TodoList";
import ListTodoList from "../ListTodoList/ListTodoList"

function App() {
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
                    <ListTodoList />
                </div>
                <div className="col">
                    <TodoList />
                </div>
                <div className="col">
                    <TodoList />
                </div>
            </div>
        </div>
    );
}

export default App;
