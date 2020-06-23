import React from 'react';
import Routes from './src/routes'
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import Firebase, { firebaseConfig, FirebaseContext } from './firebase'
import { UserProvider } from './src/context'
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }




if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function App() {

  const [user, setUser] = useState('')
  const UserContext = React.createContext()

  React.useEffect(() => {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user.uid)



      } else {
      }
    })
  }, [])



  return (

      <Routes></Routes>



  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
