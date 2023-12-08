import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, todosReducer } from './reducers';

const store = configureStore({
    reducer:
    {
        todos: todosReducer,
        login: loginReducer
    }
})

export default store;