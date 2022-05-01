// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuqrJKagnNsLS-J0JmeeJgcefOiBqX4N0",
  authDomain: "cbsstudentsweb2.firebaseapp.com",
  projectId: "cbsstudentsweb2",
  storageBucket: "cbsstudentsweb2.appspot.com",
  messagingSenderId: "726583175007",
  appId: "1:726583175007:web:d3ebde64071b975e7a38ea",
  databaseURL: "https://cbsstudentsweb2-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const database = getDatabase(app);
