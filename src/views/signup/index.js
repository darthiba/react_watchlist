import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Image, TextInput, SearchBar, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useApi from '../../services/api'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])


    const db = firebase.firestore();




    const handleButton = (email, password, passwordConfirm) => {
        if (password.length < 6) {
            console.log("Sua senha precisa ter pelo menos 6 Digitos.")
        } else {
            if (password == passwordConfirm) {
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
                navigation.navigate('Login')
            }
        }
    }





    return (

        <View style={{ flex: 10, backgroundColor: '#14181c', flexDirection: "column" }}>

            <View style={{ flex: 2, flexDirection: "column", padding: 30 }}>
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
                    autoCompleteType="password"
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                    defaultValue={password}
                />
                <TextInput
                    style={{ height: 16, flex: 1, color: 'white' }}
                    placeholder="Confirmar Senha"
                    autoCompleteType="password"
                    secureTextEntry={true}
                    onChangeText={passwordConfirm => setPasswordConfirm(passwordConfirm)}
                    defaultValue={passwordConfirm}
                />

            </View>


            <View style={{ flex: 1, width: 120, height: 35, alignSelf: 'center' }} >
                <Button title={'Registrar'} color="#2BD601" onPress={() => handleButton(email, password, passwordConfirm)}></Button>
            </View>


        </View >

    )
}

