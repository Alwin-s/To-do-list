import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Popup({todoId,setOpen,setTodoId,setTodos,todos}) {

const [spin,setSpin]=useState(null)

  const [singleTodo,setSingleTodo]=useState()
  const [editValue,setEditValue]=useState('')

useEffect(()=>{
getodoById(todoId)
},[])

  const getodoById=async(todoId)=>{
    const response= await axios.get(`https://new-todo-app-0197.onrender.com/todos/${todoId}`)
 setSingleTodo(response.data.todo)
 }

 const updateTodo=async (todoId)=>{
  if(editValue===''){
    alert("Please Enter a Edited Version...")
  }else{
    setSpin(true)
    const response=await axios.patch(`https://new-todo-app-0197.onrender.com/todos/${todoId}`,{todo:editValue})
  
    setTodos((previousTodos) => {
      const index = previousTodos.findIndex((todo) => todo._id === todoId);
      if (index !== -1) {
        const updatedTodos = [...previousTodos];
        console.log(updatedTodos[index],"indexx x");
        updatedTodos[index] = response.data.updatedTodo;
        return updatedTodos;
      } else {
        return previousTodos;
      }
    });
  
    setOpen(false)
    setSpin(false)
  }
 

 }


  const handleClose=()=>{
    setOpen(false)
    setTodoId('')
  }
  return (
    <div className='as bg-secondary position-fixed d-flex justify-content-center align-items-center'>
    <div className='w-100' >
        <h2 className='text-center'>Edit To-Do</h2>
        <hr />
        <input type="text" className='form-control ' defaultValue={singleTodo} onChange={(e) => setEditValue(e.target.value)} />
        <br />
        <div className='text-center'>
            <button className='btn btn-success' onClick={() => updateTodo(todoId)}>UPDATE</button>
            <button className='btn btn-danger  ms-4' onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>
</div>




  )
}

export default Popup