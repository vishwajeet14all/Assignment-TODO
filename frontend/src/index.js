import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'
import { Provider } from 'react-redux';
import store from './store.js'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <App />
    </Provider>

);
