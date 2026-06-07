import {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [task, setTask] = useState ("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks
    ? JSON.parse(savedTasks)
    : [];
});
const [isEditing, setIsEditing] = useState(false);
const [editIndex, setEditIndex] = useState(null);
const [editText, setEditText] = useState("");
  const handlechange = (e) => {
    setTask(e.target.value);
  };
  const addtask = () =>{
    if (task.trim() === "") return;
    setTasks([...tasks,
        {
          text: task,
          completed: false
        }
    ]);
    setTask("");
  };
  const deleteTask =(indexToDelete) =>{
    const updateTasks = tasks.filter(
      (_,index) =>index!== indexToDelete
    );
    setTasks(updateTasks);
  };
  const toggleComplete = (index) => {
  const updatedTasks = [...tasks];

  updatedTasks[index].completed =
    !updatedTasks[index].completed;

  setTasks(updatedTasks);
};
const editTask = (index) => {
  setIsEditing(true);
  setEditIndex(index);
  setEditText(tasks[index].text);
};
const updateTask = () => {
  if (editText.trim() === "") return;

  const updatedTasks = [...tasks];
  updatedTasks[editIndex].text = editText;

  setTasks(updatedTasks);
  setIsEditing(false);
  setEditIndex(null);
  setEditText("");
};
useEffect(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}, [tasks]);
  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="form-container">
        <input type="text" placeholder="Type here..." value={task} onChange={handlechange}/>&nbsp;&nbsp;
        <button onClick={addtask}>Add Task</button>
        <h3>Total Tasks: {tasks.length}</h3>
        <h3>
          Completed:
          {tasks.filter(task => task.completed).length}
        </h3>
        {isEditing && (
          <div className="edit-box">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={updateTask}>Update</button>&nbsp;
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
        <ul>
          {tasks.map((item,index)=> (
            <li key={index}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(index)}
              />
              <span
                style={{
                  textDecoration: item.completed
                    ? "line-through"
                    : "none"
                }}
              >
                {item.text}
              </span>
              <button onClick={() => editTask(index)}>
                Edit
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>    
    </div>
  );
}

export default App;
