import React, {userState,useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import "./Home.css";
import { toast } from 'react-toastify';
 import axios from "axios";
const Home = () => {
const [data, setData] = useState([]);

const loadData = async () => {
    const response = await axios.get ("http://localhost:5000/api/get");
    setData(response.data);
console.log("Data",response.data );
};
useEffect(()=>{
 loadData();
} ,[]);
const deleteContact= async (id) =>{
  if(window.confirm("delete this contact?")){
    console.log("id",id);
   await axios.get(`http://localhost:5000/api/remove/${id}`);
    toast.success("deleted successfully");
    setTimeout(()=>loadData(),500);
  }
}
  return (
    <div style={{marginTop:"150px",marginLeft:"100px"}}>
    <Link to="/addupdate">
    <button className="btn btn-contact">Add Contact</button>
    </Link>
    <Link to="/login">
    <button className="btn btn-contact">login</button>
    </Link>
    <table className=" styled-table">
     <thead>
     <tr>
              <th style={{textAlign:"right"}}>id</th>
              <th style={{textAlign:"right"}}>First_Name</th>
              <th style={{textAlign:"right"}}>Address</th>
              <th style={{textAlign:"right"}}>Contact</th>
              <th style={{textAlign:"right"}}>Job_Role</th>
              <th style={{textAlign:"center"}}>Actions</th>
      </tr>
     </thead>
          
   <tbody>
      {data.map((item,id)=>{
          return(
              <tr key ={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.First_Name}</td>
                  <td>{item.Address}</td>
                  <td>{item.Contact}</td>
                  <td>{item.Job_Role}</td>
<td>
  <Link to ={`/addupdate/${item.id}`}>
      <button className="btn btn-edit">Edit</button>
  </Link>
  
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