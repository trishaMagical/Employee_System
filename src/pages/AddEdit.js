import React, {useState,useEffect} from 'react';
import { useHistory,useParams,Link } from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import {toast} from "react-toastify";
// import { toToastItem } from 'react-toastify/dist/utils';

const initialState ={
    first_name :"",
    contact:"",
    address:"",
    job_role:"",

}
const AddEdit = (props) => {
    const [state, setState]= useState(initialState);


    const [is_Update, setis_Update]= useState(false);

    const [ids, setIds]= useState("");

    const {first_name,contact,address,job_role} = state;
    
    const history = useHistory();

    const {id} = useParams();
    
    useEffect  (  ()=>{
        try{
            console.log("Hello",props.location.pathname);
            let  path= props.location.pathname;
            let arr = path.split("/");
            console.log("arr", arr);
            
            if (arr.length===3){
                const id = arr[arr.length-1];
                setIds(id);
                console.log("id", id);
                 axios.get (`http://localhost:5000/api/get/${id}`)
                .then (res =>{
                    console.log("res",res.data[0]);
                   const obj =
                   {
                    first_name :res.data[0].first_name, 
                    contact:res.data[0].contact,
                    address:res.data[0].address,
                    job_role:res.data[0].job_role,
                   }
                  
                    setState(obj);
                    setis_Update(true);
                    console.log("Hello",res.data[0],state);
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);

                })

                
               
            
            }
            else{
    
            }
        }
        catch(ex){
            console.log("exception",ex);
        }
        

       
    },0)

    const handleSubmit = async (e) =>{
        console.log("Hi");
        console.log(first_name,contact,address,job_role);
        e.preventDefault();
        if(!first_name || !contact || !address || !job_role){
            toast.error("Please fill the form");

        } else {
            console.log("Hi2",is_Update);
            if (is_Update=== false){
                
                await axios.post("http://localhost:5000/api/addNew", 
                state
            ).then(()=>{
                setState({first_name:"",contact:"",address:"",job_role:""})
                
            }).catch((err)=> toast.error(err.response.data))
           
            } else{
                await axios.post(`http://localhost:5000/edit/${ids}`, 
                state
            ).then(()=>{
                setState({first_name:"",contact:"",address:"",job_role:""})
                
            }).catch((err)=> toast.error(err.response.data))
            
            }
            setTimeout(()=>{
                history.push("/")
                }, 500);
        }
    }
   
    const handleInputChangeforName = (e) =>{    
        const temp = {...state}
        temp.first_name = e.target.value; 
    //   const name=e.target.value;
    //     console.log("FirstName:",name);
         setState(temp);
    }

    const handleInputChangeforContact = (e) =>{
        const temp = {...state}
        temp.contact = e.target.value;
        // const contact= e.target.value;
        // console.log("Contact", contact);
        setState(temp);
    }
    const handleInputChangeforAddress = (e) =>{
        const temp = {...state}
        temp.address = e.target.value;
        // const address = e.target.value;
        // console.log("Address",address);
        setState(temp);
    }
    const handleInputChangeforJob_role = (e) =>{
        const temp = {...state}
        temp.job_role = e.target.value;
        // const job_role = e.target.value;
        // console.log("Job_Role", job_role);
        setState(temp);
    }

  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"

    }}
    onSubmit={handleSubmit}
    >
        <label htmlFor="first_Name">First_Name</label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name...."
        value={first_name || ""}
        onChange={handleInputChangeforName}
        />
        <label htmlFor="contact">Contact</label>
        <input
        type="Number"
        id="Contact"
        name="Contact"
        placeholder="Your Contact...."
        value={contact || ""}
        onChange={handleInputChangeforContact}
        />
        <label htmlFor="address">Address</label>
        <input
        type="text"
        id="address"
        name="address"
        placeholder="Your Address...."
        value={address || ""}
        onChange={handleInputChangeforAddress}
        />
        <label htmlFor="job_role">Job_Role</label>
        <input
        type="text"
        id="job_role"
        name="job_role"
        placeholder="Your Job_Role...."
        value={job_role || ""}
        onChange={handleInputChangeforJob_role}
        />
        <input type="submit" value="Save"/>
        <Link to ="/">
            <input type="button" value="Go Back"/>
        </Link>
        </form>
        
    </div>
  )
}

export default AddEdit