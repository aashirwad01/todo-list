import { useState ,useEffect } from 'react'
import Header from "./components/Header";

import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks, setTasks] = useState([
])

useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer =await fetchTasks()
    setTasks(tasksFromServer)
  }
  
  getTasks()
}, [])



// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

// Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

// Add task

const addTask= async(task)=>{
  
  const res = await fetch ('http://localhost:5000/tasks' ,
  {
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })

  const data = await res.json()
  setTasks([...tasks,data])
  
  // const id = Math.floor(Math.random()*10000)+1
  // const newTask = {id , ...task}
  // setTasks([...tasks,newTask])
  
}


// Delete Task

const deleteTask = async (id) =>{

  await fetch (`http://localhost:5000/tasks/${id}`,{
    method:'DELETE',
  })
  setTasks(tasks.filter((task)=>task.id !== id))
  

}


//Toggle Reminder

const toggleReminder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updTask ={...taskToToggle ,
  reminder:!taskToToggle.reminder}

  const res = await fetch (`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(updTask),
  }
  
  
  
  )
  const data = await res.json()
  setTasks(tasks.map((task)=>task.id===id ? { ...task,
    reminder:!task.reminder} :task
  
  ))
}

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}
      title="Todo Task Tracker"
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length>0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}
      
      />):('No Task To Show'
      )}
    <footer>
      <p> © | 2021 | aashirwad01</p>
      <ul className="footer-list">
        <li>
          <a className="links" href="https://github.com/aashirwad01" >
          <img className="img-2" src="https://img.icons8.com/material-two-tone/24/000000/github.png" alt="github"/>
          </a>
        </li>
        
        <li>
          <a className="links" href="https://twitter.com/aashirwad_01" >
          <img className="img-2" src="https://img.icons8.com/material-sharp/24/000000/twitter.png" alt="twitter"/>
          </a>
        </li>
        <li>
          <a
            className="links"
            href="https://www.linkedin.com/in/aashirwadkumar159/"
            
          >
            <img className="img-2" src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="linkedin"/>
          </a>
        </li>
      </ul>
    </footer>
     
    </div>
  );
}

export default App;
