import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2qZne_GU6pqinsJ2rWhUwuRwCgb9GkUk",
    authDomain: "hwk9-c4003.firebaseapp.com",
    projectId: "hwk9-c4003",
    storageBucket: "hwk9-c4003.appspot.com",
    messagingSenderId: "432411572826",
    appId: "1:432411572826:web:a5b849d8ba6ede8fba7663"
};

const firebaseDB = firebase.initializeApp(firebaseConfig);
export const db = firebaseDB.database().ref();
export const auth = firebaseDB.auth();