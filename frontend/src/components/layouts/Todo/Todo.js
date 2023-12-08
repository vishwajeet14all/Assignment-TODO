import React, { useEffect, useState } from 'react'
import './Todo.css'
import { useSelector } from 'react-redux';
const Todo = ({ handleEdit, key, id, task, status, handleEditClick, deleteTodo, toggleIsEdited, getTodos }) => {


  return (
    <div className=' d-flex w-50 mx-auto bg-danger mt-3'>
      <div style={{ height: "100%", background: "#f2f2f2" }} className='display-block text-left pl-3 w-75 h-100'>{task}</div>
      <div className='d-flex w-25 justify-content-center align-items-center h-100 bg-success '>
        {/* <small className='pr-2'>{status}</small> */}
        <div className="mx-2 d-flex align-items-center h-100" onClick={() => handleEdit(id)}>
          <a className='text-white text-decoration-none fa fa-edit edit px-2'></a>
        </div>
        <div className="mx-2" onClick={() => deleteTodo(id)}>
          <a className='text-white text-decoration-none fa fa-trash px-2'></a>
        </div>
        <div className="mx-2" onClick={() => handleEdit(id)} >
          <a className={`text-white text-decoration-none fa-regular fa-heart  `}></a>
        </div>
      </div>
    </div>
  )
}

export default Todo