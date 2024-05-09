import React from 'react'
import { NavigationContainer, use } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Pages/Login'
import EmailConfirmation from '../Pages/EmailConfirmation'
import Register from '../Pages/Register'

const Stack = createStackNavigator()
export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/> 
            <Stack.Screen name='EmailConfirmation' component={EmailConfirmation} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
