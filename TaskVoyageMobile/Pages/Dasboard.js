import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import axios from 'axios';

// HomeScreen component (Dashboard)
function Dashboard({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id !== null) {
          setUserId(id);
          fetchTasks(id);
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  const fetchTasks = async (id) => {
    try {
      const response = await axios.get(`http://172.20.10.5:8000/api/tasks?userId=${id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="bars" size={30} color="#000" onPress={() => navigation.toggleDrawer()} />
      <View style={styles.header}>
        <Avatar.Image size={100} source={require('../assets/parrot.png')} style={{ backgroundColor: 'rgba(0,0,0,0)' }} />
        <Text style={styles.title}>AHOOOOY MATEY! WELCOME TO TASKVOYAGE!</Text>
      </View>
      <Text style={styles.subtitle}>Here are your tasks:</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Placeholder components for other screens
function Dashboard() {
  return (
    <View style={styles.screenContainer}>
      <Text>Homepage</Text>
    </View>
  );
}

function AddTask() {
  return (
    <View style={styles.screenContainer}>
      <Text>Tasks</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings</Text>
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
        <Drawer.Screen name="Dashboard" component={Dashboard} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#F9F9F9',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#F9F9F9',
  },
  taskItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
