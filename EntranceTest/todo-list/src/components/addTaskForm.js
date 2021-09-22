import React, { useEffect, useState } from "react";
import "../css/addForm.css";
import "../css/mainStyle.css";
import TodoList from "./TodoList";
import BulkAction from "./bulkAction";

const AddTask = () => {
  const [inputText, setInputText] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getLocal()
  },[])


  useEffect(() => {
    saveLocal()
  },[todos,status])


  const saveLocal = () => {
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocal = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal)
    }
  }

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const inputDescHandler = (e) => {
    setInputDesc(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if(inputText === ''){
      alert('Task title atleast one character!')
    } else{
      setTodos([
        ...todos,
        { text: inputText, description: inputDesc,status:status, id: Math.random() * 1000 },
      ]);
    }
    setInputText("");
    setInputDesc("");
  };
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }
  return (
    <>
      <div className={"container"}>
        <div className={"form-container newTask-container"}>
          <form className={"todo-input "}>
            <h4 className={"header"}>New Task</h4>
            <input
              value={inputText}
              onChange={inputTextHandler}
              className={"title-input"}
              placeholder="Add new task.."
              type="text"
            />

            <p>Description</p>
            <input
              value={inputDesc}
              onChange={inputDescHandler}
              className={"desc-input"}
              type="text"
            />

            <div className={"DateAndPority"}>
              <div className={"DueDate"}>
                <p>Due Date</p>
                <input className={"Date-input"} />
              </div>
              <div className={"Pority"}>
                <p>Pority</p>
                <select
                onChange={statusHandler}
                  defaultValue="pority-normal"
                  name="Pority"
                  className={"filter-todo"}
                >
                  <option value="pority-low">Low</option>
                  <option value="pority-normal">Normal</option>
                  <option value="pority-high">High</option>
                </select>
              </div>
            </div>
            <button
              onClick={submitTodoHandler}
              className="btn-primary"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
        <div className="todo-container">
          <h4 className={"header"}>To Do List</h4>
          <TodoList setTodos={setTodos} todos={todos} />
          <BulkAction setTodos={setTodos} todos={todos}/>
        </div>
      </div>
    </>
  );
};

export default AddTask;
