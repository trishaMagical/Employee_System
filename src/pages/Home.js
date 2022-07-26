import React, { userState, useEffect, useState } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import "./Home.css"


const Home = () => {
  const [data, setData] = useState([]);

  // const loadData = async () => {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     console.log("userInfo",userInfo);
  //     const response = await axios.get (`http://localhost:5000/api/get/${userInfo.email}/${userInfo.first_name}/${userInfo.job_role}` );
  //     setData(response.data);
  // console.log("Data",response.data );

  //};
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", userInfo);
    axios.get(`http://localhost:5000/api/get/${userInfo.email}/${userInfo.first_name}/${userInfo.job_role}`)
      .then(response => {
        console.log("Response", `http://localhost:5000/api/get/${userInfo.email}/${userInfo.first_name}/${userInfo.job_role}`);
        setData(response.data);

      })
      .catch((err) => toast.error(err.response.data))
    console.log("Hello TRISHAAAA");
  }, []);
  const deleteContact = async (id) => {
    if (window.confirm("delete this contact?")) {
      console.log("id", id);
      await axios.get(`http://localhost:5000/api/remove/${id}`);
      toast.success("deleted successfully");
      // setTimeout(()=>loadData(),500);
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger ">
        <a className="navbar-brand text-white" href="/Home">Welcome</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/Home">Profile </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/Categories">Categoris</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link text-white" href="/logout">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className='row'>

        {/* <div className="col-3"  >
          <div className='row'>
            <div style={{ backgroundColor: "blue", color: "white" }} className="col-12 border p-2">Home</div>
          </div>
          <div className='row'>
            <div className="col-12 border p-2">Show The Tode List</div>
          </div>
          <div className='row'>
            <div className="col-12 border p-2">Todo3</div>
          </div>


        </div> */}
        <div className="col-12" >

          <table className=" styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "right" }}>id</th>
                <th style={{ textAlign: "right" }}>First_Name</th>
                <th style={{ textAlign: "right" }}>Address</th>
                <th style={{ textAlign: "right" }}>Contact</th>
                <th style={{ textAlign: "right" }}>Job_Role</th>
                <th style={{ textAlign: "right" }}>Email</th>
                <th style={{ textAlign: "right" }}>Password</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, id) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.first_name}</td>
                    <td>{item.address}</td>
                    <td>{item.contact}</td>
                    <td>{item.job_role}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <a href={`/addupdate/${item.id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </a>

                      <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>

                      {/* <Link to="/logout">
                        <button className="btn btn-view">Log Out</button>
                      </Link> */}


                    </td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>

        </div>

      </div>



    </div>


  )
}

export default Home