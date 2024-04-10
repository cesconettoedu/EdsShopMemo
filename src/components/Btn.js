import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function (props)  {

  return (
    <TouchableOpacity
      style={[props.title === 'Delete' ? styles.btnDel : styles.btn]}
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
    backgroundColor: "#ff8c00",
    borderRadius: 100,
  },
   btnDel: {
    borderWidth: 5,
    borderColor: "#e3f2fa",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#c6122e",
    borderRadius: 100,
  },
 
});