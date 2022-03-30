function TodoItem({title, isCompleted, onToggle}){
    return (<li>
        <input type="checkbox" checked={isCompleted} onToggle={onToggle}/>
        <div>{title}</div>
    </li>);
}

export default TodoItem