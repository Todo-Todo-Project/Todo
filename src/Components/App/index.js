import "./App.css";
import { Col, Container, Navbar, Row, ThemeProvider } from "react-bootstrap";
import TodoList from "../TodoList";
import ListTodoList from "../ListTodoList/ListTodoList";
import TodoDetail from "../TodoDetail/TodoDetail";
import { useEffect, useState } from "react";
import Profile from "../Profile";
import { useNavigate } from 'react-router-dom';
import {IoMdExit} from "react-icons/io";
function App() {
  let user = JSON.parse(localStorage.authInfo).user;
  const [listId, setListId] = useState("");
  const [todoId, setTodoId] = useState("");
  const navigate = useNavigate();

  const LogOut = () =>{
    localStorage.setItem('authInfo', null);
    navigate('/login');
}

  return (
    <>
      <div className="header">
        <div className="navb sticky top-0 z-50">
          <Navbar className="navbar">
            <Navbar.Brand href="home">
              <div className="todo-title">Todo Todo</div>
            </Navbar.Brand>
            <Navbar.Brand >
              <div className="logout" onClick={LogOut}><IoMdExit></IoMdExit></div>
            </Navbar.Brand>
          </Navbar>
        </div>
        <div className="body-content row pt-5 px-2">
          <div className="col-2 list_of_list_todo">
            <ListTodoList idOfListCallBack={idOfListCallBack} />
          </div>
          <div className="col-8 list_of_todo">
            <TodoList listId={listId} idOfTodoCallBack={idOfTodoCallBack} />
          </div>
          <div className="col-2 todo_detail">
            <TodoDetail id={todoId} />
          </div>
        </div>
      </div>
    </>
  );

  function idOfListCallBack(listId) {
    setListId(listId);
  }

  function idOfTodoCallBack(todoId) {
    setTodoId(todoId);
    console.log(todoId);
  }
}

export default App;
