import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function Category(props) {
  return (
    <ImageBackground source={props.image} style={styles.image}>
      <View style={[styles.textContainer, { backgroundColor: props.color }]}>
        <Text style={styles.text}>{props.category}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 25,
    borderRadius: 6,
    resizeMode: "cover",
    height: 120,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
