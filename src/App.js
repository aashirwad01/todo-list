import { useState } from 'react'
import Header from "./components/Header";
// import Button from "./components/Button";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';

const App = () => {
  const [tasks, setTasks] = useState([
    {
        id:1,
        text:"Doctors Appointment",
        day:"Feb 5th at 2:30pm",
        reminder:true,
    },
    {
        id:2,
        text:"School Meeting",
        day:"Feb 6th at 1:30pm",
        reminder:true,
    },
    {
        id:3,
        text:"Shopping Food",
        day:"Feb 5th at 2:30pm",
        reminder:false,
    },
    
    

])


// Delete Task

const deleteTask =(id) =>{
  setTasks(tasks.filter((task)=>task.id !== id))
  

}


//Toggle Reminder

const toggleReminder =(id) =>{
  setTasks(tasks.map((task)=>task.id===id ? { ...task,
    reminder:!task.reminder} :task
  
  ))
}

  return (
    <div className="container">
      <Header title="Todo Task Tracker"/>
      <AddTask />
      {tasks.length>0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}
      
      />):('No Task To Show'
      )}
   
    </div>
  );
}

export default App;
