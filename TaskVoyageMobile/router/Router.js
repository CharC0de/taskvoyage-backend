import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import EmailConfirmation from '../Pages/EmailConfirmation'

const Stack = createStackNavigator()
export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }}/> 
            <Stack.Screen name='EmailConfirmation' component={EmailConfirmation} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
