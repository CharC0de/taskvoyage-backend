import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  useEffect(() => {
    if (selectedDate) {
      fetchEvents(selectedDate);
    }
  }, [selectedDate]);

  const fetchEvents = async (date) => {
    try {
      const response = await axios.get('http://172.20.10.5:8000/api/events/?date=${date}');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEvent = async () => {
    try {
      await axios.post('http://172.20.10.5:8000/api/events/', newEvent);
      Alert.alert('Success', 'Event added successfully');
      setModalVisible(false);
      fetchEvents(selectedDate);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmAddEvent = () => {
    Alert.alert('Confirm', 'Are you sure you want to add this event?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Submit',
        onPress: addEvent,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={() => setModalVisible(true)} />
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setSelectedEvent(null);
        }}
      />
      <View style={styles.eventDetails}>
        {selectedEvent ? (
          <>
            <Text>Title: {selectedEvent.title}</Text>
            <Text>Start Date: {selectedEvent.startDate}</Text>
            <Text>End Date: {selectedEvent.endDate}</Text>
            <Text>Start Time: {selectedEvent.startTime}</Text>
            <Text>End Time: {selectedEvent.endTime}</Text>
            <Text>Description: {selectedEvent.description}</Text>
          </>
        ) : (
          <Text>No Event on this date</Text>
        )}
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />
          <DatePicker
            style={styles.datePicker}
            date={newEvent.startDate}
            mode="date"
            placeholder="Start Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setNewEvent({ ...newEvent, startDate: date })}
          />
          <DatePicker
            style={styles.datePicker}
            date={newEvent.endDate}
            mode="date"
            placeholder="End Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setNewEvent({ ...newEvent, endDate: date })}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={newEvent.startTime}
            onChangeText={(text) => setNewEvent({ ...newEvent, startTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={newEvent.endTime}
            onChangeText={(text) => setNewEvent({ ...newEvent, endTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newEvent.description}
            onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
          />
          <Button title="Submit" onPress={confirmAddEvent} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventDetails: {
    padding: 15,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
});