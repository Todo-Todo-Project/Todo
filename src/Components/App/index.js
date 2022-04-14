import './App.css';
import { Col, Container, Navbar, Row, ThemeProvider } from 'react-bootstrap';

import TodoList from '../TodoList';


function App() {
  const todos = [{id: 1, name: 'Learn English', isCompleted: true}, {id: 2, name: 'Learn Spanish', isCompleted: false}];
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="#home">
            <div class="todo-title">Todo Todo</div></Navbar.Brand>
        </Container>
      </Navbar>
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
}

export default App;
