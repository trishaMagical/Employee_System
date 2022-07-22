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
    console.log("Value", value);
    console.log("edit.id",edit.id);
    updateTodo(edit.id, value.todotext);
    setEdit({
      id: null,
      value: ""
    });
  };

  // if (edit.id) {
  //   return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  // }
  console.log("Todos", todos);

  return <form>
    <div>
    {
      todos.map((todo, index) => (
        <React.Fragment>
          {edit.id && edit.id === todo.id ?
            <TodoForm edit={edit} onSubmit={()=>submitUpdate(todo)}
              data={todos}

            />
            // console.log("data", data);
            : <div
              className={todo.isComplete ? "todo-row complete" : "todo-row"}
              key={index}
            >
              <div key={todo.id} >
                {todo.todotext}
              </div>
              <div className="icons">
                <RiCloseCircleLine
                  onClick={() => removeTodo(todo.id)}
                  className="delete-icon"
                />
                <TiEdit
                  onClick={() => setEdit({ id: todo.id, value: todo.text }) }
                  className="edit-icon"
                />
              </div>

            </div>
          }
        </React.Fragment>
      ))
      
    }
 {/* <button className="button" onClick={handleSave}>Save To DataBase</button> */}
  
  </div>
  </form>

};

export default Todo;