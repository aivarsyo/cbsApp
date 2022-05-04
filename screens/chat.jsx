import { StyleSheet, Text, View } from "react-native";
import {firestore, authentication} from "../firebase";
import { collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { useEffect } from "react";


export default function Chat() {

  useEffect(()=>{
    postDocument()
    getData()
  })

  const postDocument = async() =>{
    const docRef = await addDoc(collection(firestore, "chatrooms"), {
      participants:[
        "uldis",
        "margarita"
      ]
    });
    console.log("Document written with ID: ", docRef.id);
  }

  const getData = async() =>{
    const chatroomsCol = collection(firestore, 'chatrooms')
    const chatroomsSnapshot = await getDocs(chatroomsCol)
    const chatroomsList = chatroomsSnapshot.docs.map(doc => doc.data())

    console.log(chatroomsList)
  }

  return <Text>Chat</Text>;
}
