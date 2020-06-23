import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Image, TextInput, SearchBar, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useApi from '../../services/api'
import firebase from 'firebase'
import { FirebaseContext } from '../../../firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [userId, setUserId] = useState('')
    const firebaseContext = useContext(FirebaseContext)


    const db = firebase.firestore();


    const handleLogin = async (email, password) => {

        try {
           let response = await firebaseContext.handleLogin(email, password)



            if (response) {
                navigation.navigate('Home', {user: userId})


            } 
        } catch (error) {
           console.log(error.message)
        }
  

    }

  
    React.useEffect(() => {

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            setUserId(user.uid)

    
          } else {
          }
        })
      }, [])






    return (

        <View style={{ flex: 10, backgroundColor: '#14181c', flexDirection: "column" }}>

            <View style={{ flex: 4, flexDirection: "column", padding: 10 }}>
                <TextInput
                    style={{ height: 16, flex: 1, color: 'white' }}
                    placeholder="Email"
                    autoCompleteType="email"
                    onChangeText={email => setEmail(email)}
                    defaultValue={email}
                />
                <TextInput
                    style={{ height: 16, flex: 1, color: 'white' }}
                    placeholder="Senha"
                    secureTextEntry={true}
                    autoCompleteType="password"
                    onChangeText={password => setPassword(password)}
                    defaultValue={password}
                />

            </View>


            <View style={{ flex: 1, width: 120, height: 35, alignSelf: 'center' }} >
                <Button title={'Login'} color="#2BD601" onPress={() => handleLogin(email, password)}></Button>
            </View>
            <View style={{ flex: 1, width: 120, height: 35, alignSelf: 'center' }} >
                <Button title={'Registrar-se'} color="#2BD601" onPress={() => navigation.navigate('Sign Up')}></Button>
            </View>


        </View >

    )
}
