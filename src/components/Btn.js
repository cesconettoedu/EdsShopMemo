import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function (props)  {


  if(props.title === 'Delete'){
    
  }

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={props.onPress}
    >
      <Text style={{ color: "white" }}>{props.title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  btn: {
    borderWidth: 5,
    borderColor: "#f7f5f4",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#ff8c00",
    borderRadius: 100,
  },
 
});