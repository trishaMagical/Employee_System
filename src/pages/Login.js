import React from 'react';
import "./Login.css";
const Login = () => {
  return (
   <div>
    <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }}>
<h1>Login Page</h1>
<label >Login Id</label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder="Your First Name"
       
        
        />
        <label >Password</label>
        <input
        type="Number"
        id="Contact"
        name="Contact"
        placeholder="Your Contact Details"
      
        
        />
        
        <input type="submit" value="Login"/>
    </form>
   </div>
  )
}

export default Login