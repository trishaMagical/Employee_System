import React from 'react';
import "./Registraion.css";

const Registration = () => {
  return (
    <div>
        <h1>Registration Page</h1>
        <form>
        <h2>New User ??</h2>
        <button class="button1">Sign Up</button>
        <br/>
        <h2>Already Sign Up</h2>
        <Link to="/login">
        <button class="button2">Button</button>
        </Link>
        </form>
        
       
        
    </div>
  )
}

export default Registration