import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
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

export {firebaseConfig}
