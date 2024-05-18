import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

function SettingsScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('User123');
  const [email, setEmail] = useState('user@example.com');
  const [newUsername, setNewUsername] = useState('');



  const changeUsername = () => {
    setUsername(newUsername);
    Alert.alert('Success', 'Username changed successfully');
    setChangeUsernameVisible(false);
  };

  return (
    <View style={styles.container}>
      <Icon name="bars" size={30} color="#000" onPress={() => navigation.toggleDrawer()} />
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profilePicture} />
      <Text style={styles.label}>Username: {username}</Text>
      <Text style={styles.label}>Email: {email}</Text>
      <Button title="Change Username" onPress={() => setChangeUsernameVisible(true)} />
      <Button title="FAQ" onPress={() => setModalVisible(true)} />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>FAQ</Text>
          <Text>Q: How to change my password?</Text>
          <Text>A: Click on 'Change Password' and follow the instructions.</Text>
          <Text>Q: How to change my username?</Text>
          <Text>A: Click on 'Change Username' and follow the instructions.</Text>
          <Text>Q: How do I add a task and event?</Text>
          <Text>A: Step 1 = Input Title Name: Enter the name of your task / event.</Text>
          <Text> Step 2 = Input Dates: Specify the starting and ending dates for your task</Text>
          <Text> Step 3 = Input Times: Enter the starting and ending times for your event on the chosen dates.</Text>
          <Text> Step 4 = Write and choose the description: Provide a description or category for your event.</Text>
          <Text> Step 5 = Click Submit: Your event is now created and will be displayed on your homepage and calendar.</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>


      <Modal isVisible={isChangeUsernameVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Username</Text>
          <TextInput
            style={styles.input}
            placeholder="New Username"
            value={newUsername}
            onChangeText={setNewUsername}
          />
          <Button title="Submit" onPress={changeUsername} />
          <Button title="Cancel" onPress={() => setChangeUsernameVisible(false)} />
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

function CalendarScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Calendar Screen</Text>
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
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Tasks" onPress={() => navigation.navigate('Tasks')} />
      <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
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
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Tasks" component={TasksScreen} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="AddTask" component={AddTaskScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
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