import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from backend
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src="./img/ship.png" alt="Ship Icon3" className="ship-icon3"/>  <span>TaskVoyage</span>
        </div>
        <ul className="navigation">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/Task">Tasks</a></li>
          <li><a href="/Calendar">Calendar</a></li>
          <li><a href="/Settings">Settings</a></li>
          <li><a href="/Logout">Logout</a></li>
        </ul>
      </div>
      <div className="content-area">
        {/* Dashboard content goes here */}
        <h1>Tasks Summary</h1>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
