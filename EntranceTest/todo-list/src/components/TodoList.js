import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = ({ todos, setTodos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="todo-container">
      <input
        className='searchBar'
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      ></input>
      <ul className="todo-list">
        {todos.filter((todo) => {
          if(searchTerm == ''){
            return todo
          }else if(todo.text.toLowerCase().includes(searchTerm.toLowerCase())){
            return todo
          }
        }).map((todo) => (
          <Todo
            setTodos={setTodos}
            todos={todos}
            key={todo.id}
            todo={todo}
            text={todo.text}
            desc={todo.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
