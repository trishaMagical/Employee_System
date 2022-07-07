import React, {userState,useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import "./Home.css";
import { toast } from 'react-toastify';
 import axios from "axios";
const Home = () => {
const [data, setData] = useState([]);

// const loadData = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     console.log("userInfo",userInfo);
//     const response = await axios.get (`http://localhost:5000/api/get/${userInfo.email}/${userInfo.first_name}/${userInfo.job_role}` );
//     setData(response.data);
// console.log("Data",response.data );

//};
useEffect(()=>{
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log("userInfo",userInfo);
  const response = axios.get (`http://localhost:5000/api/get/${userInfo.email}/${userInfo.first_name}/${userInfo.job_role}`)
  .then(response=>{
    setData(response.data);
  })
  .catch((err)=> toast.error(err.response.data))

} ,[]);
const deleteContact= async (id) =>{
  if(window.confirm("delete this contact?")){
    console.log("id",id);
   await axios.get(`http://localhost:5000/api/remove/${id}`);
    toast.success("deleted successfully");
    // setTimeout(()=>loadData(),500);
  }
}
  return (
    <div style={{marginTop:"150px",marginLeft:"100px"}}>
    {/* <Link to="/addupdate">
    <button className="btn btn-contact">Add Contact</button>
    </Link> */}
    
    <table className=" styled-table">
     <thead>
     <tr>
              <th style={{textAlign:"right"}}>id</th>
              <th style={{textAlign:"right"}}>First_Name</th>
              <th style={{textAlign:"right"}}>Address</th>
              <th style={{textAlign:"right"}}>Contact</th>
              <th style={{textAlign:"right"}}>Job_Role</th>
              <th style={{textAlign:"right"}}>Email</th>
              <th style={{textAlign:"right"}}>Password</th>
              <th style={{textAlign:"center"}}>Actions</th>
      </tr>
     </thead>
          
   <tbody>
      {data.map((item,id)=>{
          return(
              <tr key ={item.id}>
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
  
      <button className="btn btn-delete" onClick={()=> deleteContact(item.id)}>Delete</button>
  
  {/* <Link to ={`/view/${item.id}`}>
      <button className="btn btn-view">View</button>
  </Link> */}
</td>
              </tr>
          )
      }
      )}
   </tbody>
    </table>
  </div>
)
}

export default Home