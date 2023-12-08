import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details,setDetails]=useState({
        task:{task},
        status:{status},
        favourite:{favourite},
    })
    return (
        <div>
            <h1>To Do List</h1>
            <p onClick={logout}>Logout</p>
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your task here..' onChange={(e) => setValue(e.target.value)}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Update