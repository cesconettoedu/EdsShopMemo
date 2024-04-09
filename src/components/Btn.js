import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function Btn(props) {

  return (
    <TouchableOpacity
      style={  {
        borderWidth: 5,
        borderColor: "#f7f5f4",
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 70,
        position: "absolute",
        backgroundColor: "#ff8c00",
        borderRadius: 100,
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: "white" }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Btn