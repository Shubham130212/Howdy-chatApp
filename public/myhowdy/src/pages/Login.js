import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';

const Login = () => {

    const navigate=useNavigate(); 
    const [values, setValues] = useState({
        username: "",
        password: "",
        
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme:'dark',
    };

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/");
        }
    },[]);

    const handleSubmit =async(event) => {
        event.preventDefault();
       if( handleValiation()){
        
        const { password,username } = values;
        const{data}=await axios.post(loginRoute,{
            username,password,
        });
        if(data.status===false){
            toast.error(data.message,toastOptions)
        }
        if(data.message===true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate("/");
        }
        
       }
    };
    const handleValiation = () => {
        const { password,username } = values;

       
       
         if(username.length===""){
            toast.error("username is incorrect",toastOptions);
            return false;
        }
       

        else if(password.length===""){
            toast.error("password is incorrect",toastOptions);
            return false;
        }
        
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });

    };

    return (
        <>
            <FormContainer>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={logo} alt="logo" />
                        <h1>Howdy</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" required onChange={(e) => handleChange(e)} min="3"/>
                   
                    <input type="password" placeholder="Password" name="password" required onChange={(e) => handleChange(e)} />
                    
                    <button type="submit">Login</button>
                    <span>Don't have an account?<Link to="/register">Register</Link></span>
                    
                </form>

            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`

height:100vh;
width:100vw;
dispaly:flex;
flex-direction:column;
margin:2rem 25rem 5rem  ;
gap:1rem;
background-color:white;

.brand{
    display: flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    background-color:#000000;
}
    img{
        height:3rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
    form{
        display:flex;
        flex-direction:column;
        height:85vh;
        width:25rem;
        padding:3rem 5rem;
        gap:2rem;
        background-color:#000000;
        color:black;
        justify-content:center;
        border-radius:1rem;
        
    }
    input{
        padding:0.5rem;
        border-radius:0.5rem;
        background-color:transparent;
        font-size:1rem;
        width:100%;
        color:white;
        
    }
    button{
        padding:0.5rem;
        background-color:#997af0;
        color:white;
        border-radius:0.5rem;
        font-size:1rem;
        width:100%;
        cursor:pointer;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        :hover{
            background-color:#4e0eff;
        }
        
    }
    span{
        color:white;
        font-size:1rem; 
        text-transform:uppercase;
     }
    
    
    }



`;

export default Login;

