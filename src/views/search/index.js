import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Button, StyleSheet, Image, TextInput, SearchBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useApi from '../../services/api'
import firebase from 'firebase'

export default function Search({ route, navigation }) {

    let { title, user } = route.params

    const db = firebase.firestore();
    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
        },
        tinyLogo: {
            width: 50,
            height: 50,
        },
        logo: {
            width: 100,
            height: 150,
        },
    });
    const [data, setData] = useState([])
    const { getMovies } = useApi()
    const baseUrl = 'http://image.tmdb.org/t/p/w200/'

    React.useEffect(() => {
        getMovies(title).then((e) => { setData(e.data.results) })

    }, [])
    const handleButton = (id, title, year, poster, user) => {

        db.collection("movies").add({
            id: id,
            title: title,
            year: year.split("-")[0],
            poster: poster,
            user: user

        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        navigation.navigate('Home', {lastMovie: id})
    }
    return (
        <View
            style={{ flex: 1, backgroundColor: '#14181c' }}>







            <FlatList
                refreshing={false}
                onRefresh={() => getMovies(title).then((e) => setData(e.data))}
                keyExtractor={(e) => e.key}
                data={data}
                numColumns={1}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, flexDirection: "row", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
                            <Text key={(item.id)}
                                style={{
                                    color: 'white'
                                }}>
                                {`${item.title}`} ({`${item.release_date}`})
                        </Text>
                            <Image
                                style={styles.logo}
                                source={{ uri: baseUrl + item.poster_path }}

                            />
                        </View>
                        <View style={{ padding: 10 }}><Button title="Adicionar" onPress={() => handleButton(item.id, item.title, item.release_date, item.poster_path, user)}></Button></View>
                    </View>
                )}
            />
            <Button title="Voltar" onPress={() => navigation.goBack()}></Button>
        </View >
    )
}
