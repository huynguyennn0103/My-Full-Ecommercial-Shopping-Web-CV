import React from 'react'
import './todo.css'
import { useEffect, useState } from 'react'
import { userRequest } from '../../requestMethods'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
const Todo = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState("")
    const [filter, setFilter] = useState(0)
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
    const handleFinished = (e,targetTodo) =>{
            const updateFinished = async() =>{
                const res = await userRequest(TOKEN).put(`/todos/${targetTodo._id}`,{
                    userId: currentUser._id,
                    action: {
                        ...targetTodo,
                        isFinished: e.target.checked    
                    }
                })
                if(filter === 1){
                    setTodos(res.data.todos && res.data.todos.length > 1?
                    res.data.todos.sort((a,b) => a.todo.length - b.todo.length).filter(item =>item.isFinished === true)                  
                    : 
                    res.data.todos.filter(item =>item.isFinished === true))
                }
                else if (filter === 2){
                    setTodos(res.data.todos && res.data.todos.length > 1?
                        res.data.todos.sort((a,b) => a.todo.length - b.todo.length).filter(item =>item.isFinished === false)                  
                        : 
                        res.data.todos.filter(item =>item.isFinished === false))
                }
                else{
                    setTodos(res.data.todos && res.data.todos.length > 1?res.data.todos.sort((a,b) => a.todo.length - b.todo.length): res.data.todos)
                }
                
            }
            updateFinished();   
    }
    const handleAdd = () =>{
        const addTask = async () =>{
            const res = await userRequest(TOKEN).post("/todos",{
                userId: currentUser._id,
                action:{
                    todo: task,
                    isFinished: false
                }
            })
            setTodos(res.data.todos && res.data.todos.length > 1?res.data.todos.sort((a,b) => a.todo.length - b.todo.length): res.data.todos)
            setTask("")
        }
        addTask()     
    }
    const handleDeleteSingleTask = (id)=> {
        const deleteSingleTask = async () =>{
            const res = await userRequest(TOKEN).delete(`/todos/${id}`,{
                data:{
                    userId: currentUser._id
                }
            })
            if(filter === 1){
                setTodos(res.data.todos && res.data.todos.length > 1?
                    res.data.todos.sort((a,b) => a.todo.length - b.todo.length).filter(item => item.isFinished === true)
                    : res.data.todos).filter(item => item.isFinished === true)       
            }
            else if (filter === 2){
                setTodos(res.data.todos && res.data.todos.length > 1?
                    res.data.todos.sort((a,b) => a.todo.length - b.todo.length).filter(item => item.isFinished === false)
                    : res.data.todos).filter(item => item.isFinished === false)  
            }
            else{

                setTodos(res.data.todos && res.data.todos.length > 1?res.data.todos.sort((a,b) => a.todo.length - b.todo.length): res.data.todos)
            }
            
        }
        deleteSingleTask()
    }
    const handleDeleteDoneTasks = () =>{
        const deleteDoneTasks = async () =>{
            const res = await userRequest(TOKEN).delete("/todos?isFinished=true", {
                data:{
                    userId: currentUser._id
                }
            })
            if(filter === 1){
                setTodos(res.data.todos && res.data.todos.length > 1?
                    res.data.todos.sort((a,b) => a.todo.length - b.todo.length).filter(item => item.isFinished === true)
                    : res.data.todos).filter(item => item.isFinished === true)       
            }
            else if (filter === 2){
                setTodos(res.data.todos && res.data.todos.length > 1?
                    res.data.todos.sort((a,b) => a.todo.length - b.todo.length).filter(item => item.isFinished === false)
                    : res.data.todos).filter(item => item.isFinished === false)  
            }
            else{

                setTodos(res.data.todos && res.data.todos.length > 1?res.data.todos.sort((a,b) => a.todo.length - b.todo.length): res.data.todos)
            }
        }
        deleteDoneTasks()
    }
    const handleGetAllTasks = () =>{
        const getAllTasks = async () =>{
            const res = await userRequest(TOKEN).get(`/todos/${currentUser._id}`)
            setTodos(res.data.todos && res.data.todos.length > 1?res.data.todos.sort((a,b) => a.todo.length - b.todo.length): res.data.todos)
            setFilter(0)
        }
        getAllTasks()
    }
    const handleGetDoneTasks = () =>{
        const getDoneTasks = async () =>{
            const res = await userRequest(TOKEN).get(`/todos/${currentUser._id}?isFinished=true`)
            setTodos(res.data[0].todos && res.data[0].todos.length > 1?res.data[0].todos.sort((a,b) => a.todo.length - b.todo.length): res.data[0].todos)
            setFilter(1)
        }
        getDoneTasks()
    }
    const handleGetTodoTasks = () =>{
        const getTodoTasks = async () =>{
            const res = await userRequest(TOKEN).get(`/todos/${currentUser._id}?isFinished=false`)
            setTodos(res.data[0].todos && res.data[0].todos.length > 1?res.data[0].todos.sort((a,b) => a.todo.length - b.todo.length): res.data[0].todos)
            setFilter(2)
        }
        getTodoTasks()
    }
    useEffect(() =>{
        const getTodos = async() =>{
            try {
                console.log(currentUser._id)
                const res = await userRequest(TOKEN).get(`/todos/${currentUser._id}`);
                setTodos(res.data.todos && res.data.todos.sort((a,b) => a.todo.length - b.todo.length))
            } catch (error) {
                console.log("Error in fetching data")
            }

        }
        getTodos();
    },[])
  return (
    <div className='todo'>
        <div className="todo-container">
            <h1 className="input-title"> Input</h1>
            <div className="todo-input">
                <div className="input-container">
                    <div className="logo-input"><i className="fa-solid fa-list"></i></div>
                    <input type="text" placeholder='New Todo' value={task} onChange={(e) => setTask(e.target.value)}/>
                </div>
                <button className='button-add' onClick={() => handleAdd()}>Add new task</button>
            </div>

            <h1 className="input-title"> TodoList</h1>
            <div className="todo-filter">
                <button onClick={() => handleGetAllTasks()}>All</button>
                <button  onClick = {() => handleGetDoneTasks()}>Done</button>
                <button  onClick= {() => handleGetTodoTasks()}>Todo</button>
            </div>
            <div className="todo-content">
                {todos.length > 0 && todos.map((item)=>(
                <div className="do" key={item._id}>
                    <span className={item.isFinished? "finished":""}>{item.todo}  </span>
                    <div className="activity">
                        <i><input type="checkbox" checked={item.isFinished} onChange={(e) => handleFinished(e,item)}/></i>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <i className="fa-solid fa-trash" onClick={() => handleDeleteSingleTask(item._id)}></i>
                    </div>
                </div>
                ))}


            </div>
            <div className="delete-button">
                <button onClick={() => handleDeleteDoneTasks()}>Delete done tasks</button>
                <button>Delete all tasks</button>
            </div>
        </div>
    </div>
  )
}

export default Todo
