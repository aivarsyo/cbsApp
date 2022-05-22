import React from "react";
import { Image } from "react-native";

const RoundPhoto = (props) => {
  return (
    <Image
      style={{ width: 100, height: 100, borderRadius: 50 }}
      source={props.source}
    />
  );
};

export default RoundPhoto;
