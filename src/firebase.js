// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9khuj2Sm-ebtXM9F1carMeztPNsYTQMA",
    authDomain: "cncm-scratch-c79d0.firebaseapp.com",
    projectId: "cncm-scratch-c79d0",
    storageBucket: "cncm-scratch-c79d0.appspot.com",
    messagingSenderId: "275238441115",
    appId: "1:275238441115:web:04fa9df9427b75ce23f63e",
    measurementId: "G-W9GY48TZCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getFirestore(app)


export {
    app,
    auth,
    database
}