import React from "react";
import "../css/todo.css";

const Todo = ({ text, todo, todos, setTodos }) => {
  const removeHandler = () => {
    // console.log(todo.id)
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const detailHandler = () => {

  }
  return (
    <div className="todo">
      <div className='checkAndTitle'>
        <input type="checkbox" />
        <li className="todo-item">{text}</li>
      </div>
      <div className='removeAndDetail-btn'>
        <button onClick={detailHandler} className="btn-detail">Detail</button>
        <button onClick={removeHandler} className="btn-remove">
          Remove
        </button>
      </div>
    </div>
  );
};

export default Todo;
