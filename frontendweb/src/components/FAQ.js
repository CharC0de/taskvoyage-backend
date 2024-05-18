// FAQ.js

import React from 'react';
import './FAQ.css'; // Import CSS file for styling

const FAQ = () => {
  return (
    <div className="faq">
      <div className="sidebar1">
        <div className="logo">
          <img src="./img/ship.png" alt="Ship Icon3" className="ship-icon3"/>  <span>TaskVoyage</span>
        </div>
        <ul className="navigation">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/Task">Tasks</a></li>
          <li><a href="/Calendar">Calendar</a></li>
          <li><a href="/Settings">Settings</a></li>
          <li><a href="/FAQ">FAQ</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </div>
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>

        {/* Task Instructions */}
        <div className="faq-section">
          <h3>Task Instructions</h3>
          <p><strong>Q: How do I add a task?</strong></p>
          <p>A: Follow these steps:</p>
          <ol>
            <li><strong>Input Task Name:</strong> Enter the name of your task.</li>
            <li><strong>Input Dates:</strong> Specify the starting and ending dates for your task.</li>
            <li><strong>Input Times:</strong> Enter the starting and ending times for your task on the chosen dates.</li>
            <li><strong>Choose Category:</strong> Select a category for your task (Personal, Education, Sports, Health).</li>
            <li><strong>Click Submit:</strong> Your task is now created and will be displayed on your homepage and task page.</li>
          </ol>
        </div>

        {/* Event Instructions */}
        <div className="faq-section">
          <h3>Event Instructions</h3>
          <p><strong>Q: How do I add an event?</strong></p>
          <p>A: Follow these steps:</p>
          <ol>
            <li><strong>Input Event Name:</strong> Enter the name of your event.</li>
            <li><strong>Input Dates:</strong> Specify the starting and ending dates for your event.</li>
            <li><strong>Input Times:</strong> Enter the starting and ending times for your event on the chosen dates.</li>
            <li><strong>Write Description:</strong> Provide a description for your event.</li>
            <li><strong>Click Submit:</strong> Your event is now created and will be displayed on your homepage and calendar.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
