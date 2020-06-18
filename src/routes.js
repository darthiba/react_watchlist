import React from 'react'
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase'

import Home from './views/home'
import Search from './views/search'
import Signup from './views/signup'
import Login from './views/login'
import Loading from './views/loading'


export default function Routes(props) {
    const Stack = createStackNavigator()
    let initialScreen = ''
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            initialScreen = 'Login'
        } else {
            // User is signed out.
            // ...
            initialScreen = 'Login'
        }
    })

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    // headerShown: false
                }}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Search' component={Search} />
                <Stack.Screen name='Sign Up' component={Signup} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Loading' component={Loading} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}