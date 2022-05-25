// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA30QjRX4F9IeqlpyHK5znNQGn2uXALFYo",
  authDomain: "cbsstudentsweb-7953a.firebaseapp.com",
  databaseURL: "https://cbsstudentsweb-7953a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cbsstudentsweb-7953a",
  storageBucket: "cbsstudentsweb-7953a.appspot.com",
  messagingSenderId: "871703630749",
  appId: "1:871703630749:web:e10978c4948bd0cf681574"
  //databaseURL: "https://cbsstudentsweb2-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);