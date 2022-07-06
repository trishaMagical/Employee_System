import React, {useState,useEffect} from 'react';

import "./Login.css";
import axios from 'axios';




const Login = () => {
    
    const[email, setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[first_Name, setfirst_name]= useState("");
const loginSubmit = async(e) =>{
    e.preventDefault();
       
    axios
    .get("http://localhost:5000/api/login/trisha.hazra@gmail.com/12345678")
    .then(res=>{
    console.log(res.data[0].email);
    console.log(res.data[0].first_name);
    localStorage.setItem("userInfo", JSON.stringify(res.data[0]));
   window.location='/Home';
    
    }).catch(err=>{
        console.log(err);
    })
   
}

  return (
     <div>
    <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }} 
    onSubmit={loginSubmit}>
    <h2>Login Page</h2>    
    <label >Email Id:</label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder="Your Email Id"
       />
       <br/>
        <label >Password:</label>
        <input
        type="text"
        id="password"
        name="password"
        placeholder="Your Password"
      
        
        />
        
        <input type="submit" value="Login"/>
    </form>


    </div>
  )
}

export default Login