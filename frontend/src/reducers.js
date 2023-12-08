import { createReducer } from "@reduxjs/toolkit";


//todosReducer
const initialState = {
    todos: [],
    loading: false,
    error: null,

}

export const todosReducer = createReducer(initialState, {
    todosRequest: (state, action) => {
        state.loading = true;
        state.todos = [];
    },

    todosSuccess: (state, action) => {
        console.log(action, 'action');
        state.loading = false;
        state.todos = action.payload;
        state.error = null
    },

    todosFailure: (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
    },
    clearError: (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = null;
    },
});


//login Reducer
const loginIntialState = {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
}

export const loginReducer = createReducer(loginIntialState, {
    loginRequest: (state, action) => {
        state.loading = true;
        state.user = [];
    },

    loginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },

    loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    logout: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    }
})




