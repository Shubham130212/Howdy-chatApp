import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';

const Register = () => {

    const navigate=useNavigate(); 
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme:'dark',
    };

    useEffect(()=>{
       if(localStorage.getItem('user-caht-app')){
        navigate("/");
       }
    },[]);

    const handleSubmit =async(event) => {
        event.preventDefault();
       if( handleValiation()){
        
        const { password,username,email } = values;
        const{data}=await axios.post(registerRoute,{
            username,email,password,
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
        const { password,confirmPassword,username,email } = values;

        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same",toastOptions);
            return false;
        }
       
        else if(username.length<3){
            toast.error("username should be grater than 3 characters",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("email should not be empty",toastOptions);
            return false;
        }

        else if(password.length<8){
            toast.error("password should be grater than or equal to 8 characters",toastOptions);
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
                    <input type="text" placeholder="Username" name="username" required onChange={(e) => handleChange(e)} />
                    <input type="email" placeholder="Email" name="email" required onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" required onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={(e) => handleChange(e)} />

                    <button type="submit">Create User</button>
                    <span>Already have an account? <Link to='/login'>Login</Link></span>
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

export default Register;
