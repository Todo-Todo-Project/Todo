import './App.css';
import {Container, Navbar, ThemeProvider, Row, Col} from 'react-bootstrap';
import TodoList from '../TodoList/TodoList';
function App() {
  const todos = [{id: 1, name:'learn english', isCompleted: true}, {id: 2, name:'learn spa', isCompleted: false}]
  return (
    <ThemeProvider breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']}>
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand href="home">Brank Link</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col md={4}>Left Menu</Col>
          <Col md={8}><TodoList todos={todos}/></Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
