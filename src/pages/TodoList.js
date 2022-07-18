import React,{useState} from 'react';
const initialState ={
  todolist:""

}

const TodoList = () => {
  const [state, setState]= useState(initialState);
  const {todolist} = state;

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
      <input type="text"
        id="todolist"
        name="todolist"
        placeholder="Your Todo's...." value={todolist } />
    
    </>
  )
}

export default TodoList