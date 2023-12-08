import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/layouts/Home/Home.js'
import Login from './components/layouts/Login/Login.js';
import Register from './components/layouts/Register/Register.js';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const App = () => {
    // optional configuration
    const options = {
        // you can also just use 'bottom center'
        position: positions.BOTTOM_CENTER,
        timeout: 5000,
        offset: '30px',
        // you can also just use 'scale'
        transition: transitions.SCALE
    }
    return (
        // <AlertProvider template={AlertTemplate} {...options}>
        <Router>
            <Routes>
                <Route exact path="/" Component={Home}></Route>
                <Route exact path="/login" Component={Login}></Route>
                <Route exact path="/register" Component={Register}></Route>
            </Routes>
        </Router>


    )
}

export default App