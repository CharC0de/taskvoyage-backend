import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    // Filter tasks based on search query
    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, tasks]);

  const handleSearch = () => {
    // Perform search operation
    // This could be implemented in future versions
  };

  const handleAddTask = () => {
    // Redirect to add task page
    // This could be implemented in future versions
  };

  const handleMarkAsOngoing = (id) => {
    // Update task status as ongoing
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: 'Ongoing' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleMarkAsCompleted = (id) => {
    // Update task status as completed
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: 'Completed' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleMarkAsFailed = (id) => {
    // Update task status as failed
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: 'Failed' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAddTask}>Add Task</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.startTime}</td>
                <td>{task.endTime}</td>
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>{task.status}</td>
                <td>
                  {task.status === 'Ongoing' ? (
                    <button onClick={() => handleMarkAsCompleted(task.id)}>Mark as Completed</button>
                  ) : (
                    <button onClick={() => handleMarkAsOngoing(task.id)}>Mark as Ongoing</button>
                  )}
                  {new Date(task.endDate) < new Date() && task.status !== 'Completed' ? (
                    <button onClick={() => handleMarkAsFailed(task.id)}>Mark as Failed</button>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No tasks exist, please create a task.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
