import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend
    // Implement this according to your backend API
  }, []);

  const handleEventClick = (info) => {
    // Handle event click
    // Implement this if you want to perform any action when an event is clicked
  };

  const handleEventRender = (info) => {
    // Customize event rendering
    // You can modify event colors or other properties here
  };

  const handleEventAdd = (event) => {
    // Add event to the calendar
    setEvents([...events, event]);
    // Implement saving the event to the backend if needed
  };

  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventRender={handleEventRender}
      />
      {/* Add event form */}
      <EventForm addEvent={handleEventAdd} />
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
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Date & Time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Date & Time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default Calendar;
