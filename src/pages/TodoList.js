import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";
import "./Todo.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect  (  ()=>{
   
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log("data",data);
    axios
    .get(`http://localhost:5000/api/todoSaved/${data.email}`)
    .then(response => {
      console.log("response",response.data);
      // console.log("response",response.data, JSON.pa]]rse(response.data));
      
      setTodos(response.data);

    })
     .catch(err=>{
        console.log(err);
    })
    
   
},0)
  
  const addTodo =  (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log("NewTodos", newTodos);
    handleSave(todo);
    console.log(...todos);
    window.location='/TodoList';
  };
const handleSave = async(todo) =>{
  
    const data = JSON.parse(localStorage.getItem("userInfo"));
   console.log("data",data);
    
    axios
    .post(`http://localhost:5000/addtodo/${data.email}`,
 {todotext:todo.text},
    )
    
    
}
  const updateTodo = async (id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
     
    }
    axios
    .put(`http://localhost:5000/updatetodo/${id}`,
    {todotext:newValue},
    )
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? newValue : item))
    );
    console.log("NewValue", newValue);
  console.log("Todos123",todos);
  //await handleSave();
  window.location='/TodoList';
  };

  const removeTodo = async(id) => {
    console.log("ID",id);
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    axios
    .get(`http://localhost:5000/deletetodo/${id}`,
 
    )
    setTodos(removedArr);
    // handleSave(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger ">
        <a className="navbar-brand text-white" href="#">Welcome</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-white" href="/Home">Profile </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link text-white" href="/TodoList">Todo's</a>
            </li>
            
            <li className="nav-item ms-auto">
              <a className="nav-link text-white"  href="/logout">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        // completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;