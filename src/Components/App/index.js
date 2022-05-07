<<<<<<< HEAD
import './App.css';
import { Col, Container, Row, ThemeProvider } from 'react-bootstrap';
import Nav from '../Nav/index'
import TodoList from '../TodoList';
=======
import "./App.css";
import { Col, Container, Navbar, Row, ThemeProvider } from "react-bootstrap";
>>>>>>> 2e1feb4aac9f273cbb2fe21c9673f8fde4597dbd

import TodoList from "../TodoList";
import ListTodoList from "../ListTodoList/ListTodoList"

function App() {
<<<<<<< HEAD
  const todos = [{id: 1, name: 'Learn English', isCompleted: true}, {id: 2, name: 'Learn Spanish', isCompleted: false}];
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      {/* <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="#home">
            <div className="todo-title">Todo Todo</div></Navbar.Brand>
        </Container>
      </Navbar> */}
      <Nav></Nav>
      <Container>
        {/* <Col md={1}>
          <Row md={1}>Left menu</Row>
        </Col> */}
        <Col md={2}>
          <Row md={12}><TodoList todos={todos} /></Row>
        </Col>
      </Container>
    </ThemeProvider>
  );
=======
    const todos = [
        { id: 1, name: "Learn English", isCompleted: true },
        { id: 2, name: "Learn Spanish", isCompleted: false },
    ];
    return (
        // <ThemeProvider
        //   breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        // >
        //   <Navbar className="navbar">
        //     <Container>
        //       <Navbar.Brand href="#home">
        //         <div className="todo-title">Todo Todo</div></Navbar.Brand>
        //     </Container>
        //   </Navbar>
        //   <Container>
        //     <Col md={1}>
        //       <Row md={1}>Left menu</Row>
        //     </Col>
        //     <Col md={2}>
        //       <Row md={12}><TodoList todos={todos} /></Row>
        //     </Col>
        //   </Container>
        // </ThemeProvider>
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
            </div>
        </div>
    );
>>>>>>> 2e1feb4aac9f273cbb2fe21c9673f8fde4597dbd
}

export default App;
