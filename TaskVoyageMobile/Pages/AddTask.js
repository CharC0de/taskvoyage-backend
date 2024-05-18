import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';

function AddTask({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    category: '',
  });

  const searchTasks = async () => {
    try {
      const response = await axios.get('http://172.20.10.5:8000/api/tasks/?search=${searchQuery}');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post('http://your-django-backend-url/api/tasks/', newTask);
      Alert.alert('Success', 'Task added successfully');
      setModalVisible(false);
      searchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmAddTask = () => {
    Alert.alert('Confirm', 'Are you sure you want to add this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Submit',
        onPress: addTask,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Icon name="bars" size={30} color="#000" onPress={() => navigation.toggleDrawer()} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={searchTasks} />
      {tasks.length === 0 ? (
        <Text>No task exists. Create Task</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedTask(item)}>
              <View style={styles.taskRow}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedTask && (
        <View style={styles.taskDetail}>
          <Text>Title: {selectedTask.title}</Text>
          <Text>Start Date: {selectedTask.startDate}</Text>
          <Text>End Date: {selectedTask.endDate}</Text>
          <Text>Start Time: {selectedTask.startTime}</Text>
          <Text>End Time: {selectedTask.endTime}</Text>
          <Text>Category: {selectedTask.category}</Text>
          <Text>Status: {selectedTask.status}</Text>
        </View>
      )}

      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })}
          />
          <DatePicker
            style={styles.datePicker}
            date={newTask.startDate}
            mode="date"
            placeholder="Start Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setNewTask({ ...newTask, startDate: date })}
          />
          <DatePicker
            style={styles.datePicker}
            date={newTask.endDate}
            mode="date"
            placeholder="End Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setNewTask({ ...newTask, endDate: date })}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={newTask.startTime}
            onChangeText={(text) => setNewTask({ ...newTask, startTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={newTask.endTime}
            onChangeText={(text) => setNewTask({ ...newTask, endTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={newTask.category}
            onChangeText={(text) => setNewTask({ ...newTask, category: text })}
          />
          <Button title="Submit" onPress={confirmAddTask} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

// Placeholder components for other screens
function HomeScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text>Home Screen</Text>
      </View>
    );
  }
  
  function AddTaskScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text>Add Task Screen</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
  
  // Custom drawer content
  function CustomDrawerContent({ navigation }) {
    const handleLogout = () => {
      Alert.alert('Confirm', 'Are you sure you want to logout your account?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.replace('Login'),
        },
      ]);
    };
  
    return (
      <View style={styles.drawerContent}>
        <Button title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
        <Button title="Tasks" onPress={() => navigation.navigate('AddTask')} />
        <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }
  
  const Drawer = createDrawerNavigator();
  
  export default function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={Dashboard} />
          <Drawer.Screen name="AddTask" component={AddTask} />
          <Drawer.Screen name="Calendar" component={Calendar} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#874c3c',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskRow: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  taskDetail: {
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
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});