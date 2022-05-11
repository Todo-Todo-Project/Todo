import "./App.css";
import { Col, Container, Navbar, Row, ThemeProvider } from "react-bootstrap";
import Sidebar from '../Sidebar/Sidebar';
import TodoList from "../TodoList";

function App() {
    const todos={};
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
        <>
        <div className="header">
            <div className="navb">
                <Navbar className="navbar">
                    <Navbar.Brand href="#home">
                        <div className="todo-title">Todo Todo</div>
                    </Navbar.Brand>
                </Navbar>
            </div>
            <div className="main">
                <div className="left col">
                </div>
                <div className="right col">
                    <TodoList todos={todos} />
                </div>
            </div>
        </div>
        <Sidebar></Sidebar>
        </>
    );
}

export default App;
