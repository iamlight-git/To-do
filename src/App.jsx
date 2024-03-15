import { useState, useEffect } from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"


const App = () => {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState ([])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //fetch tasks
 
const fetchTasks = async () => {
  try {
    const res = await fetch('http://localhost:5000/tasks')

    if (!res.ok) {
      throw new Error('Failed to fetch tasks')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching tasks:', error.message)
    return [] // Return an empty array in case of error
  }
}

  //fetch task
  const fetchTask = async (id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //add Task
  const addTask = async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])

    //const id = Math.floor(Math.random()*1000)+1
    //const newTask = {id, ...task}
    //setTasks([...tasks, newTask])
  }
  
 
  //delete task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    

    setTasks(tasks.filter((task)=>task.id !== id));
  }

  // Toogle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,
    reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers:{
        'Contend-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task)=> task.id ===id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <div className='container'>
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
      {showAddTask &&<AddTask onAdd={addTask}></AddTask>}
       {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks> :'No Task to show'}
    </div>
  )
}

export default App
