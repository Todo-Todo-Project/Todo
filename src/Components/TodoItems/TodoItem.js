function TodoItem({ name, isCompleted, onToggle }) {
  return (<li>
    <input type="checkbox" checked={isCompleted} onChange={onToggle} />
    <div>{name}</div>
  </li>);
}

export default TodoItem;