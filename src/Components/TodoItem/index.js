import EditTodo from "../EditTodo/editTodo";

function TodoItem({ name, isCompleted, onToggle }) {
  return (<li>
    <input type="checkbox" checked={isCompleted} onChange={onToggle} />
    <div>{name}</div>
    <EditTodo></EditTodo>
  </li>);
}

export default TodoItem;