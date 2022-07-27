import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'
 import Todo from "./Todo"

export default class TodoList extends Component {
  state = {
    input: "",
    data: [],
    edit: -1,
    update:""
  }
  handleChange = (e) => {
    this.setState({ input: e.target.value });

  }
  async componentDidMount() {

    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log("data", data);

    let { data: post } = await axios
      .get(`http://localhost:5000/categorytodo/${data.email}`)

    console.log("Data.post", post);
    this.setState({ data: post })
  }
  addCategory = async () => {
    console.log("Trisha", this.state.input);
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log("data", data);

    axios
      .post(`http://localhost:5000/addcategories/${data.email}`,
        { categoryname: this.state.input },
        window.location = "/Categories"
      )


  }
  edit = (id)=>{
    console.log("id", id);
    this.setState({ edit:id })
  }

  editCategory = async(id) => {
console.log("Idddd", id);
let data=[...this.state.data]
let obj = data.find(s1=>s1.id===id)
console.log("id", id);

axios
      .put(`http://localhost:5000/updatecategory/${id}`,
        { categoryname: obj.categoryname }
       
      )
      this.setState({Index:-1})
      window.location = "/Categories"
  }
  deleteCategory = async (categoryname) => {
    
    console.log("ABCDRtyxse", categoryname);
    axios
      .get(`http://localhost:5000/deletecategory/${categoryname}`,

        window.location = "/Categories"
      )

  }
  handleEditChange = (e,id) =>{
    let data=[...this.state.data]
    console.log("Dataabcdfjhgj", data);
    let ind= data.findIndex(s1=>s1.id===id)
    console.log("Index", ind,id);
    let obj= data[ind]
    obj["categoryname"]= e.target.value
    console.log("OBJ", obj);
    data[ind]=obj
   this.setState({data})
  }
  render() {

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
                <a className="nav-link text-white" href="/Categories">Categories</a>
              </li>
              <li className="nav-item ms-auto">
                <a className="nav-link text-white" href="/logout">Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
        <h1>What's the plan for Today</h1>
        <input
          placeholder="Add a todo"
          name="text"
          className="todo-input"

          onChange={this.handleChange}
          value={this.state.input}
        />
        
        <button onClick={this.addCategory} className="todo-button">
          Add todo
        </button>
        {this.state.data.map((val, index) =>
          <div key={index}>

            {val.categoryname}

            <div>
              <button onClick={()=>this.edit(val.id)}>Edit</button>
              {
                val.id === this.state.edit ?
                <div>
                 <input
                value={val.categoryname}
                  placeholder="Update a todo"
                  name="text"
                  className="todo-input"
                  onChange={(e)=>this.handleEditChange(e,val.id)}
                 
                /> 
                <button onClick={()=>this.editCategory(val.id)}>Save</button>
                </div>

                :
                <div>
                 </div>
                
              }
             
            </div>
            <div>
              <button onClick={() => this.deleteCategory(val.categoryname)}>Delete</button>
            </div>
            <div>
              
            <Link to="/Todo">
          <button>click</button>
        </Link>
             
              
            </div>
          </div>

        )}

      </>
    )
  }
}
