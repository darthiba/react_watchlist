import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Image, TextInput, SearchBar, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useApi from '../../services/api'
import firebase from 'firebase'

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Loading({ navigation }) {

    const [userId, setUserId] = useState('');


    const db = firebase.firestore();






    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) { 
            if (user) {
     
    
              setUserId(user.uid)
              console.log(user.uid)
            //   navigation.navigate('Home',{user: userId})
    
    

            } else {
              // User is signed out.
              // ...
            }
          })


    }, [])











    return (

        <View style={{ flex: 10, backgroundColor: '#14181c', flexDirection: "column" }}>
             
        </View >

    )
}
