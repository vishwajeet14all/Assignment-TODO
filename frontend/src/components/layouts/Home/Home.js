import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useAlert } from 'react-alert';
import './Home.css'

import { useNavigate } from 'react-router-dom';
// import './Home.css'
import Todo from '../Todo/Todo';
import EditTodo from '../EditTodo/EditTodo';
const Home = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    //reducers data
    const { user, isAuthenticated } = useSelector(state => state.login);
    const { todos } = useSelector(state => state.todos);

    //use state declaration
    const [value, setValue] = useState("");
    const [addTodo, setAddTodo] = useState({ task: "", status: "completed" });
    const [isEditing, setIsEditing] = useState();
    const [editedValue, setEditedValue] = useState("");

    // if (!isAuthenticated) {
    //     navigate('/login');
    // }

    //form submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        getTodos();
    }


    const [edit, setEdit] = useState(false);
    console.log('render')
    const handleEdit = (id) => {
        console.log('edit')
        const updatedTodos = todos.map(todo => {
            return todo.id === id ? { ...todo, isEdited: true } : todo;
        });
        console.log(updatedTodos)

        dispatch({ type: "todoSuccess", todos: updatedTodos });
    };

    useEffect(()=>{
        
    },[handleEdit])
    // Inside the Home component
    const handleEditClick = (id) => {
        console.log('called')
        setIsEditing(!isEditing);
        // If entering edit mode, set the edited value to the current task value
        if (!isEditing) {
            setEditedValue(todos.find(task => task.id === id)?.task || "");
        }
    };

    //delete method
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/todo/${id}`);
            getTodos();
        } catch (err) {
            console.log(err);
        }
    }

    //update todo
    const updateTodo = async (id) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/todo/${id}`);
            getTodos();
        } catch (err) {
            console.log(err);
        }
    }

    //get all todos
    const getTodos = async () => {
        dispatch({ type: 'todosRequest' });
        let page = 1;
        let search = value.length != 0 ? `?search=${value}&` : `?`;
        try {
            const { data } = await axios.get(`http://localhost:4000/api/v1/todos${search}page=${page}`);
            const { results } = data;
            dispatch({ type: "todosSuccess", payload: results });
        } catch (err) {
            dispatch({ type: "todosFailure", err })
        }
    }

    //create task
    const handleCreate = async (e) => {
        e.preventDefault();;
        try {
            const response = await axios.post('http://localhost:4000/api/v1/todo/add', addTodo);
            document.getElementById('task').value = ""
            setAddTodo({ status: "completed", task: "" })
            getTodos();
        } catch (err) {
            console.log(err);
        }

    }
    let toggleIsEdited;

    //get task value
    const handleText = (e) => {
        setAddTodo({ ...addTodo, task: e.target.value });
    }



    //logout method
    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/logout');
            dispatch({ type: "logout" });
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    //calling getTodos
    // useEffect(() => {
    //     getTodos();
    // }, [isEditing]);




    return (
        <div className='h-100 w-100 d-flex'>
            {/* <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div> */}
            {/* <h1>To Do Lists</h1>
            <p onClick={logout}>Logout</p>
            <br></br> */}
            {/* <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your task here..' onChange={(e) => setValue(e.target.value)}></input>
                <button>Submit</button>
            </form>
            <form className="mt-3" onSubmit={handleCreate}>
                <input id="task" type="text" onChange={(e) => handleText(e)} name='task' placeholder='your task..'></input>
                <button type="submit">Add Task</button>
            </form> */}
            {/* //     <ol className='list-style-none w-50 mt-5 '>
        //         
        //             return (<div>
        //                 <li className='w-100 d-flex'>
        //                     <p className='w-25'>{key.task}</p>
        //                     <p className='mx-2'>{key.status}</p>
        //                     <a onClick={() => updateTodo(key.id)} className='pl-3 fa fa-edit text-primary'></a>
        //                     <a onClick={() => deleteTodo(key.id)} className='pl-2 fa fa-trash text-secondary'></a>
        //                 </li>
        //             </div>);
        //         })}
        //     </ol>
        // </div> */}
            <div className='h-50 d-flex flex-column mx-auto my-auto form min-vw-100'>
                {/* <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div> */}
                <h3>To Do List</h3>

                <form className="mt-3 w-50 mx-auto" onSubmit={handleCreate}>
                    <input className='w-75' id="task" type="text" onChange={(e) => handleText(e)} name='task' placeholder='Add new task...'></input>
                    <button className='w-25' type="submit"><b className='fa-solid fa-plus'></b></button>
                </form>
                <form onSubmit={handleSubmit} className='w-50 mx-auto'>
                    <input className='w-75' type="text" placeholder='Search your task here..,' onChange={(e) => setValue(e.target.value)}></input>
                    <button className='w-25'><a className='fa fa-search'></a></button>
                </form>
                <div className=''>

                    {todos && todos.map((key) => (
                        !key.isEdit ?
                            (
                                <Todo
                                    key={key.id}
                                    id={key.id}
                                    status={key.status}
                                    task={key.task}
                                    handleEditClick={handleEditClick}
                                    deleteTodo={deleteTodo}
                                    toggleIsEdited={toggleIsEdited}
                                    getTodos={getTodos}
                                    handleEdit={handleEdit}
                                />
                            )
                            : (
                                <EditTodo
                                    key={key.id}
                                    id={key.id}
                                    status={key.status}
                                    task={key.task}
                                    handleEditClick={handleEditClick}
                                    deleteTodo={deleteTodo}
                                    toggleIsEdited={toggleIsEdited}
                                />
                            )
                    ))}
                </div>
            </div>
            {/* <button
                onClick={() => {
                    alert.show('Oh look, an alert!')
                }}
            >
                Show Alert
            </button> */}
        </div>
    )
}

export default Home

{/* <label for="username">Email</label>
                <input type="text" placeholder="Email or Phone" name="email" id="username" onChange={handleChange}></input>

                <label for="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" onChange={handleChange}></input>

                <button>Log In</button> */}



// <div className='input pt-3 d-flex flex-row justify-content-between w-100'>
//     {isEditing ? (
//         <p>
//             <input className=''
//                 type="text"
//                 value={editedValue}
//                 onChange={(e) => setEditedValue(e.target.value)}
//             />
//         </p>
//     ) : <p className='pl-2'>{key.task}</p>}

//     <div className='d-flex flex-row'>
//         <small className='pr-2'>{key.status}</small>
//         <div onClick={() => handleEditClick(key)}><i className='text-primary text-decoration-none fa fa-edit px-2'></i></div>
//         <a onClick={() => deleteTodo(key.id)} className='text-primary text-decoration-none fa fa-trash px-2'></a>
//         <a onClick={() => deleteTodo(key.id)} className='text-primary text-decoration-none fa-regular fa-heart px-2'></a>
//     </div>
// </div>