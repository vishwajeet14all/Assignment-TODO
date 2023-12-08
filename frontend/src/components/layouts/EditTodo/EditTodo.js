import React from 'react'
// import './EditTodo.css'
const EditTodo = ({ key, id, status, task, handleEdit, deleteTodo }) => {
  return (
    <div className='input pt-3 d-flex flex-row '>
      <input placeholder=''></input>
      <div className='d-flex flex-row'>
        <small className='pr-2'>{status}</small>
        <div onClick={() => handleEdit(id)}><i className='text-primary text-decoration-none fa fa-edit px-2'></i></div>
        <a onClick={() => deleteTodo(id)} className='text-primary text-decoration-none fa fa-trash px-2'></a>
        <a onClick={() => deleteTodo(id)} className='text-primary text-decoration-none fa-regular fa-heart px-2'></a>
      </div>
    </div>
  )
}

export default EditTodo