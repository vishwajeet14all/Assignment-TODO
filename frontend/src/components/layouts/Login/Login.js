import axios from 'axios';
// import e from 'express';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const [details, setDetails] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(details);
        setDetails({ ...details, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: "loginRequest" });
        try {
            // console.log('called')
            const { data } = await axios.post('http://localhost:4000/api/v1/login', details);
            // navigate.push('http://localhost:3000/');
            dispatch({ type: "loginSuccess", data });
            navigate('/');
        } catch (err) {
            dispatch({ type: "loginFailure", err });
            console.log(err);
        }
    }
    return (
        <div class="login-page">
            <div class="form">
                <form class="login-form" onSubmit={e => handleLogin(e)}>
                    <input type="text" placeholder="username" name="email" onChange={handleChange} />
                    <input type="password" placeholder="password" name="password" onChange={handleChange} />
                    <button>login</button>
                    <p class="message"><a href="/register">Create an account</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login