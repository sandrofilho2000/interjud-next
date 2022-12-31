import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

export const firebaseConfig = {
    apiKey: "AIzaSyAekpLxlulJuVRMb5XJs_V4bBtk9GSc-Mg",
    authDomain: "interjud-6e608.firebaseapp.com",
    projectId: "interjud-6e608",
    storageBucket: "interjud-6e608.appspot.com",
    messagingSenderId: "911913095195",
    appId: "1:911913095195:web:6d27d43260b7bee34328be",
    measurementId: "G-P2W368DGW0"
};

const app =  firebase.initializeApp(firebaseConfig) 
export const db = app.firestore()
export const storage = app.storage()
export const auth = getAuth()

