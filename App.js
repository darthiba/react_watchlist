import React from 'react';
import Routes from './src/routes'
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import {firebaseConfig} from './firebase'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }




if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function App() {
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
