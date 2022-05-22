import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const NavigateAccess = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={{ color: "#5050A5" }}>{props.text}</Text>
      <Text style={{ color: "#5050A5", fontWeight: "bold" }}>
        {props.text2}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigateAccess;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
