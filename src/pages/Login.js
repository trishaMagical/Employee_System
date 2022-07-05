import React from 'react'
import "./Login.css"
const Login = () => {
  return (
    <div>
    <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }} >
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