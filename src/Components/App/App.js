import './App.css';
import { Col, Container, Navbar, Row, ThemeProvider } from 'react-bootstrap';
import ToDoList from '../TodoList';

function App() {
  const todos = [{id: 1, name: 'Learn English', isCompleted: true}, {id: 2, name: 'Learn Spanish', isCompleted: false}];
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Brand link</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col md={4}>Left menu</Col>
          <Col md={8}><ToDoList todos={todos} /></Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
