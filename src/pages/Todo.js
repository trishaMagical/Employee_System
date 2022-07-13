import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import axios from 'axios';
import "./Todo.css";


// import { IoIosDoneAll } from 'react-icons/io';

const Todo = ({ todos, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ""
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ""
    });
  };

  // if (edit.id) {
  //   return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  // }
  console.log("Todos", todos);
const handleSave = async() =>{
  
    const data = JSON.parse(localStorage.getItem("userInfo"));
   console.log("data",data);
    
    axios
    .put(`http://localhost:5000/api/todolist/${data.email}`,
 {todolist:JSON.stringify(todos)},
    )
    
    
}
  return <div>
    {
      todos.map((todo, index) => (
        <React.Fragment>
          {edit.id && edit.id === todo.id ?
            <TodoForm edit={edit} onSubmit={submitUpdate}
              data={todos}

            />
            // console.log("data", data);
            : <div
              className={todo.isComplete ? "todo-row complete" : "todo-row"}
              key={index}
            >
              <div key={todo.id} >
                {todo.text}
              </div>
              <div className="icons">
                <RiCloseCircleLine
                  onClick={() => removeTodo(todo.id)}
                  className="delete-icon"
                />
                <TiEdit
                  onClick={() => setEdit({ id: todo.id, value: todo.text })}
                  className="edit-icon"
                />
              </div>

            </div>
          }
        </React.Fragment>
      ))
    }
 <input type="submit" value="Save To DataBase"/>
    {/* <button onClick={handleSave} >Save To Database</button> */}
  </div>


};

export default Todo;