import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import "./Categories.css"


export default class TodoList extends Component {
  state = {
    input: "",
    data: [],
    edit: -1,
    update: ""
  }
  handleChange = (e) => {
    this.setState({ input: e.target.value });

  }
  async componentDidMount() {
    console.log("Trisha", this.state.input);
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log("datam", data);

    let post = await axios
        .get(`http://localhost:5000/categorytodo/${data.email}`)

    console.log("post", post.data);
    this.setState({ data: post.data })

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
  edit = (id) => {
    console.log("id", id);
    this.setState({ edit: id })
  }

  editCategory = async (id) => {
    console.log("Idddd", id);
    let data = [...this.state.data]
    let obj = data.find(s1 => s1.id === id)
    console.log("id", id);

    axios
      .put(`http://localhost:5000/updatecategory/${id}`,
        { categoryname: obj.categoryname }

      )
    this.setState({ Index: -1 })
    window.location = "/Categories"
  }
  editCancel = ()=>{
    const query = new URLSearchParams(this.props.location.search);
    let categoryname = query.get("categoryname")
    console.log("categoryname", categoryname);

    window.location =  "/Categories"
}
  deleteCategory = async (categoryname) => {

    console.log("ABCDRtyxse", categoryname);
    axios
      .get(`http://localhost:5000/deletecategory/${categoryname}`,

        window.location = "/Categories"
      )

  }
  handleEditChange = (e, id) => {
    let data = [...this.state.data]
    console.log("Dataabcdfjhgj", data);
    let ind = data.findIndex(s1 => s1.id === id)
    console.log("Index", ind, id);
    let obj = data[ind]
    obj["categoryname"] = e.target.value
    console.log("OBJ", obj);
    data[ind] = obj
    this.setState({ data })
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
              <li className="nav-item ">
                <a className="nav-link text-white" href="/Categories">Categories</a>
              </li>
              <li className="nav-item ms-auto">
                <a className="nav-link text-white" href="/logout">Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='firstContainer'>
          <h1 className='labelContainer'>What's the plan for Today</h1>
          <input
            placeholder="Add a todo"
            name="text"
            className="todo-inputAdd"
            onChange={this.handleChange}
            value={this.state.input}
          />
          <button className="btn-add" onClick={this.addCategory} >
            Add Category
          </button>
          <br/>
          <br/>
          <div className='tableclass'>
            <table className="styled-table" >
              <thead className='headersStyling'>

                <tr >
                  <th className='categorylabelStyle'>Category</th>

                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>

              </thead>
              <tbody >
                {this.state.data.map((val, index) => {

                  return (
                    <tr >
                      <td key={index}>
                        <a className='categoryvalueStyle' href={"/Todo?categoryname=" + val.categoryname}  >
                          {val.categoryname}
                        </a>
                        {
                          val.id === this.state.edit ?
                            <div>
                              <input
                                value={val.categoryname}
                                placeholder="Update a CategoryName"
                                name="text"
                                className="todo-input"
                                onChange={(e) => this.handleEditChange(e, val.id)}

                              />
                              <br/>
                              <button className="btn-save" onClick={() => this.editCategory(val.id)}>Save</button>
                              <button className="btn-cancel" onClick={() => this.editCancel()}>Cancel</button>
                            </div>

                            :
                            <div>
                            </div>

                        }
                      </td>
                      <td>
                        <button className="btn-edit" onClick={() => this.edit(val.id)}>Edit</button>

                        <button className="btn-delete" onClick={() => this.deleteCategory(val.categoryname)}>Delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </>
    )
  }
}
