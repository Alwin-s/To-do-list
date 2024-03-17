import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Popup from './Popup';
import Form from 'react-bootstrap/Form';
import "./Components/edit.css"
function TodoList() {
    const [todos,setTodos]=useState([])
    const [newTodo,setNewTodo]=useState('')
    const [todoId,setTodoId]=useState()




    const[open,setOpen]=useState(false)
    const[spin,setSpin]=useState(null)
    const[inspin,setInSpin]=useState(null);

    const getTodo=async()=>{
        const response=await axios.get("https://new-todo-app-0197.onrender.com/todos");
        setTodos(response.data.todos)
    }

    const postTodo=async()=>{
        if(newTodo===""){
            alert("Please Enter something...")
        }else{
            setInSpin(true)
            const response=await axios.post("https://new-todo-app-0197.onrender.com/todos",{todo:newTodo});
            setTodos((previousTodo)=>[...previousTodo,response.data.newTodo])
            setNewTodo('')  
            setInSpin(false)
        }
      
    }

    const deleteTodo=async(id)=>{
        setSpin(id)
        await axios.delete(`https://new-todo-app-0197.onrender.com/todos/${id}`);
        setTodos(todos.filter(a=>a._id !==id))
    }

    
const handleClick=(id)=>{
    setTodoId(id)
    setOpen(true)
}



    useEffect(()=>{
        getTodo()
    },[])
    return (
        <>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="inputdiv rounded" >
            <div>
                <h2 className='text-center'>To-Do-List</h2><br />
                <input type="text" className="inptbox form-control" placeholder="Enter a task...."  value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} />
                <br />
                <button className="btn btn-primary form-control" onClick={postTodo}>
                {inspin ? ( <>  <Spinner animation="border" size="sm"  /> </> ) : ("Add Task")}
                </button>
                <br /><br />    
                <div id="tasksContainer">
                    {
                        todos?.map((item,index)=>(
                            <div style={{display:"flex",justifyContent:"space-between"}} className=' mb-2'>
                                {
                                    
                                }
                                <div className='main d-flex align-items-center ' style={{justifyContent:"space-between",width:"100%"}}>
                              
                             <label className='po d-flex fw-bold fs-5' htmlFor={`male ${index}`}><Form.Check className='fs-6 mt-1' aria-label="option 1" id={`male ${index}`} /> 
                             &nbsp; &nbsp;{item.todo}</label>
                                <div>
                                <button  className='btn btn-success' onClick={()=>handleClick(item._id)}><i class="fa-solid fa-pen"></i></button>

                                
                                <button className='btn btn-danger ms-3' onClick={()=>deleteTodo(item._id)}>
                                {spin === item._id ? <Spinner animation="border" size="sm" /> : <i class="fa-regular fa-trash-can "></i>} 
                                </button>   
                                </div>             
                                </div>
                            </div>
                            
                            
                        ))
                    }
                 
                </div>
                        
            </div>
            
        </div>
    </div>
     {todoId&&open &&  <Popup todoId={todoId} setOpen={setOpen} setTodoId={setTodoId} setTodos={setTodos} todos={todos}/>}
    </>

    );
}

export default TodoList;
