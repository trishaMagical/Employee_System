import React from 'react'
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    

<div style={{marginTop: "100px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }}
   
    >
        <label htmlFor="first_Name">First_Name</label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name...."
        
        />
        <label htmlFor="contact">Contact</label>
        <input
        type="Number"
        id="Contact"
        name="Contact"
        placeholder="Your Contact...."
        
        />
        <label htmlFor="address">Address</label>
        <input
        type="text"
        id="address"
        name="address"
        placeholder="Your Address...."
       
        />
        <label htmlFor="job_role">Job_Role</label>
        <input
        type="text"
        id="job_role"
        name="job_role"
        placeholder="Your Job_Role...."
        
        />
        <input type="submit" value="Save"/>
        <Link to ="/">
            <input type="button" value="Go Back"/>
        </Link>
        </form>
    </div>
  )
}

export default SignUp