import React, { Component } from 'react'
import axios from "axios";
import categories from "./Categories"
// import {useLocation} from "react-router-dom";
export default class Todo extends Component {
    state = {
        input: "",
        data: [],
         edit: -1,
        update:""
    }
    async componentDidMount() {
      
        const query = new URLSearchParams(this.props.location.search);
      let categoryname=  query.get("categoryname")
        console.log("categoryname", categoryname);

        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        
        let { data: post } = await axios
            .get(`http://localhost:5000/alltodo/${data.email}/${categoryname}`)

        console.log("Data.post", post);
        this.setState({ data: post })
       
    }
    addTodo = async () => {
        const query = new URLSearchParams(this.props.location.search);
        let categoryname=  query.get("categoryname")
          console.log("categoryname", categoryname);

        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        //let categoryname = this.props.categoryname
        // console.log("categoryname",categoryname);

        axios
            .post(`http://localhost:5000/addtodo/${data.email}/${categoryname}`,
                { todotext: this.state.input },
                window.location = "Todo?categoryname="+categoryname
                
            )
                 
    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }
    edit = (id)=>{
        console.log("id", id);
        this.setState({ edit:id })
      }
    
  editTodo = async(id) => {
    const query = new URLSearchParams(this.props.location.search);
    let categoryname=  query.get("categoryname")
      console.log("categoryname", categoryname);
    console.log("Idddd", id);
    let data=[...this.state.data]
    let obj = data.find(s1=>s1.id===id)
    console.log("id", id);
    
    axios
          .put(`http://localhost:5000/updatetodo/${id}`,
            { todotext: obj.todotext }
           
          )
          this.setState({Index:-1})
          window.location = "Todo?categoryname="+categoryname  
      }
      handleEditChange = (e,id) =>{
        let data=[...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind= data.findIndex(s1=>s1.id===id)
        console.log("Index", ind,id);
        let obj= data[ind]
        obj["todotext"]= e.target.value
        console.log("OBJ", obj);
        data[ind]=obj
       this.setState({data})
      }
    deleteTodo = async (id) => {
        const query = new URLSearchParams(this.props.location.search);
        let categoryname=  query.get("categoryname")
          console.log("categoryname", categoryname);

        console.log("ABCDRtyxse", id);
        axios
            .get(`http://localhost:5000/deletetodo/${id}`,

            window.location = "Todo?categoryname="+categoryname   
            )
           
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
                <div>
                    <h1>Category Wise Todo</h1>
                    <input
                        placeholder="Add a todo"
                        name="text"
                        className="todo-input"
                        value={this.state.input}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.addTodo} className="todo-button">
                        Add todo
                    </button>

                    {
                        this.state.data.map((val, index) =>
                            <div key={index}>
                                {val.todotext}

                                <div>
              <button onClick={()=>this.edit(val.id)}>Edit</button>
              {
                val.id === this.state.edit ?
                <div>
                 <input
                value={val.todotext}
                  placeholder="Update a todo"
                  name="text"
                  className="todo-input"
                  onChange={(e)=>this.handleEditChange(e,val.id)}
                 
                /> 
                <button onClick={()=>this.editTodo(val.id)}>Save</button>
                </div>

                :
                <div>
                 </div>
                
              }
             
            </div>

                                <div>
                                    <button onClick={() => this.deleteTodo(val.id)}>Delete</button>
                                </div>
                            </div>


                        )}

                </div>
            </>
        )
    }
}
