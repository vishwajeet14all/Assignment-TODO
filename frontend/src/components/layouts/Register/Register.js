import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './Register.css'
const Register = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(details);
        setDetails({ ...details, [name]: value });
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            // console.log('called')
            const data = await axios.post('http://localhost:4000/api/v1/register', details);
            // navigate.push('http://localhost:3000/');
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <div class="login-page">
            <div class="form">
                <form class="login-form" onSubmit={e => handleRegister(e)}>
                    <input type="text" placeholder="username" name="email" onChange={handleChange} />
                    <input type="password" placeholder="password" name="password" onChange={handleChange} />
                    <button>register</button>
                    <p class="message"><a href="/login">Already have account? <p className="text-success">Sign in</p></a></p>
                </form>
            </div>
        </div>
    )
}

export default Register