import * as firebase from 'firebase';
import React, { createContext } from 'react'


// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
// import { FirebaseProvider, withFirebaseHOC  } from './src/context'
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDLH8AFmUFFd0h0Cyl29rRL27GGEiyNnVo",
    authDomain: "watchlist-a2118.firebaseapp.com",
    databaseURL: "https://watchlist-a2118.firebaseio.com",
    projectId: "watchlist-a2118",
    storageBucket: "watchlist-a2118.appspot.com",
    messagingSenderId: "523836378295",
    appId: "1:523836378295:web:db0d2933d0b3f255245132"
};

const Firebase = {
    

    handleLogin: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)


    },

    getID: () => {
       let userId
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
               userId = user.uid
                // console.log(user.uid)
                // console.log(user)
                } else {
            }
        })

        return (userId)
    },

    getData: (db, user) => {
        let movies = []
 
        db.collection("movies").where('user', '==', user).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data2 = doc.data()
            data2.key = doc.id
            movies.push(data2)

        });    
           
    });
    return movies}


}

export { firebaseConfig }
export const FirebaseContext = React.createContext(Firebase)
export default { Firebase }
// export { FirebaseProvider, withFirebaseHOC }

