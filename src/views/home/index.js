import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Image, TextInput, SearchBar, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useApi from '../../services/api'
import firebase from 'firebase'

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
    const [search, setText] = useState('')
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    const [buttonLabel, setButtonLabel] = useState('Gerar Filme do Dia');

    const db = firebase.firestore();
    let movies = []

    const baseUrl = 'http://image.tmdb.org/t/p/w200/'


    const styles = StyleSheet.create({
        logo: {
            width: 100,
            height: 150,
            justifyContent: 'flex-end',
        },
    });


    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user.uid)
                console.log(user.uid)
                console.log(user)

            } else {
            }
        })
    }, [])

    React.useEffect(() => {
        db.collection("movies").where('user', '==', user).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data2 = doc.data()
                data2.key = doc.id
                movies.push(data2)

            });

            setData(movies)

           
        });
    }, [data])


    const deleteButton = (item) => {
        db.collection('movies').doc(item.key).delete().then(function () {
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

        db.collection("movies").where('user', '==', user).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.key = doc.id
                movies.push(data)
            });
            setData(movies)
        });
    }

    const logoutButton = () => {
        firebase.auth().signOut().then(function () {
            navigation.navigate('Login')
        }).catch(function (error) {
        });
    }


    const refreshList = (newData) => {
        if (buttonLabel == 'Gerar Filme do Dia') {
            setButtonLabel('Exibir Lista Completa')


            setData([newData])

        }
        else {
            setButtonLabel('Gerar Filme do Dia')
            db.collection("movies").where('user', '==', user).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.key = doc.id
                    movies.push(data)
                });
                setData(movies)
            });
        }
    }


    return (

        <View style={{ flex: 10, backgroundColor: '#14181c', flexDirection: "column" }}>

            <View style={{ flex: 1, flexDirection: "row", padding: 0, paddingLeft: 10, paddingRight: 10 }}>
                <TextInput
                    style={{ height: 20, flex: 14, color: 'white' }}
                    placeholder="Busca de Filmes"
                    onChangeText={search => setText(search)}
                    defaultValue={search}/>
                <View style={{ width: 30, height: 30, flex: 1, paddingLeft: 10 }} >
                    <Button title="+" color="#2BD601" onPress={() => navigation.navigate('Search', { title: search, user: user })}></Button>
                </View>
            </View>


            <View style={{ flex: 1, width: 120, height: 35, alignSelf: 'center' }}>
                <Button title={buttonLabel} color="#2BD601" onPress={() => refreshList(data[Math.floor(Math.random() * data.length)])}></Button>
            </View>

            <View style={{ flex: 8 }}>
                <FlatList
                    refreshing={false}
                    keyExtractor={(e) => e.id}
                    data={data}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: "column", padding: 10, justifyContent: 'flex-end' }}>
                            <Text key={(item.id)}
                                style={{
                                    // adjustFontSizeToFit: true,
                                    color: 'white'
                                }}>
                                {`${item.title}`} ({`${item.year}`})
                        </Text>
                            <ImageBackground
                                style={styles.logo}
                                source={{ uri: baseUrl + item.poster }}>
                                <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}><Icon name="trash" size={25} color="#CD160A" onPress={() => deleteButton(item)} /></View>
                            </ImageBackground>
                        </View>
                    )}
                />
            </View>

            <View style={{ flex: 1, width: 60, height: 20, alignSelf: 'center' }} >
                <Button title='Sair' color="#2BD601" onPress={() => logoutButton()}></Button>
            </View>
        </View >

    )
}
