import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import "./Calendar.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addedEvent, setAddedEvent] = useState(null); // Added state to store the newly added event

  useEffect(() => {
    // Fetch events from backend
    // Implement this according to your backend API
  }, []);

  const handleEventClick = (info) => {
    // Handle event click
    setSelectedEvent(info.event);
  };

  const handleEventDelete = () => {
    // Delete event from the calendar
    setEvents(events.filter(event => event !== selectedEvent));
    // Implement deleting the event from the backend if needed
    setSelectedEvent(null);
  };

  const handleCancel = () => {
    // Clear the selected event
    setSelectedEvent(null);
  };

  const handleEventRender = (info) => {
    // Customize event rendering
    // You can modify event colors or other properties here
    info.el.querySelector('.fc-content').innerHTML += `<button onClick="handleDeleteClick(${info.event.id})">Delete</button>`;
  };

  const handleEventAdd = async (event) => {
    // Add event to the calendar
    setEvents([...events, event]);
    // Implement saving the event to the backend
    try {
      const response = await axios.post(
        'http://localhost:8000/api/events/',
        event
      );
      setAddedEvent(response.data); // Set the added event
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="sidebar2">
        <div className="logo2">
          <img src="./img/ship.png" alt="Ship Icon4" className="ship-icon4"/>  <span>TaskVoyage</span>
        </div>
        <ul className="navigation2">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/Task">Tasks</a></li>
          <li><a href="/Calendar">Calendar</a></li>
          <li><a href="/Settings">Settings</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </div>
      <div className="content">
        <h1>Calendar</h1>
        {/* Add event form */}
        <EventForm addEvent={handleEventAdd} />
        {/* Display added event details */}
        {addedEvent && (
          <EventDetails
            event={addedEvent}
            onDelete={handleEventDelete}
            onCancel={handleCancel}
          />
        )}
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventRender={handleEventRender}
        />
        {/* Display selected event details */}
        {selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onDelete={handleEventDelete}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

const EventDetails = ({ event, onDelete, onCancel }) => {
  return (
    <div>
      <h2>Event Details</h2>
      <p>Title: {event.title}</p>
      <p>Start: {event.startStr}</p>
      <p>End: {event.endStr}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end) return;
    addEvent({ title, start, end });
    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <div className="event-form">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Event Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="start">Start Date & Time:</label>
        <input
          type="datetime-local"
          id="start"
          placeholder="Start Date & Time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <label htmlFor="end">End Date & Time:</label>
        <input
          type="datetime-local"
          id="end"
          placeholder="End Date & Time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default CalendarPage;
