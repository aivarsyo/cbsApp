import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
  } from "react-native";

const Input = (props) =>{
  return (
    <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>{props.titleText}</Text>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="rgba(35,35,35, 0.2)"
          value={props.value}
          onChangeText={props.onChangeText}
          style={styles.input}
          secureTextEntry={props.secureTextEntry}
        ></TextInput>
        </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
      borderColor: "#E6E6E6",
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      paddingTop: 7,
      paddingBottom: 2
    },
    inputTitle:{
      fontSize:14,
      fontWeight:"600",
      color:"#32305D"
    },
    input:{
      paddingVertical:10,
      color:"#32305D",
      fontSize:17,
    },
  });
