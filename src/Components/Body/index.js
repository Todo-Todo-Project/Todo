import { Col, Container, Navbar, Row, ThemeProvider, Button} from 'react-bootstrap';
function Body(){
    function addTodoItem(){
        
    }
    return(
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        >
        <Row className='header'>
            <Button variant="success">Add A Todo Item</Button>{' '}
        </Row>
        <Row className='container'>
            <Col className='left-menu' sm>left</Col>
            <Col className='main-menu' sm>main</Col>
            <Col className='right-menu' sm>right</Col>
        </Row>
        
        
        </ThemeProvider>
    )
}
export default Body