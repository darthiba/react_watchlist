import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Image, TextInput, SearchBar, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useApi from '../../services/api'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])


    const db = firebase.firestore();


    const handleLogin = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then().catch(function(error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          })

        }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              console.log(user.email)
              navigation.navigate('Home')
              // ...
            } else {
              // User is signed out.
              // ...
            }
          })
          






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
                    style={{ height: 16, flex:1, color: 'white' }}
                    placeholder="Senha"
                    secureTextEntry={true}
                    autoCompleteType="password"
                    onChangeText={password => setPassword(password)}
                    defaultValue={password}
                />

            </View>


            <View style={{ flex: 1, width: 120, height: 35, alignSelf: 'center' }} >
                <Button title={'Login'} color="#2BD601" onPress={() => handleLogin(email,password)}></Button>
            </View>
            <View style={{ flex: 1, width: 120, height: 35, alignSelf: 'center' }} >
                <Button title={'Registrar-se'} color="#2BD601" onPress={() => navigation.navigate('Sign Up')}></Button>
            </View>


        </View >

    )
}
