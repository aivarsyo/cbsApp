import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const VioletButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export default VioletButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5050A5",
    borderRadius: 5,
    paddingVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 15,
  },
});
