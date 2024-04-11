import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function (props)  {

  return (
    <TouchableOpacity
      style={[props.title === 'Delete' ? [styles.btn, styles.red] : [styles.btn, styles.orange]]}
      onPress={props.onPress}
    >
      <Text style={{ color: "white" }}>{props.title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  btn: {
    borderWidth: 5,
    borderColor: "#e3f2fa",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  red: {
    backgroundColor: "#c6122e",
  },
  orange: {
    backgroundColor: "#ff8c00",
  }


 
});