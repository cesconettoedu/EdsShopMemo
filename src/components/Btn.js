import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function (props)  {

  return (
    <TouchableOpacity
      style={[props.title === 'Delete' ? [styles.btn, styles.red] : 
              props.title === 'Take Picture' ? [styles.btn, styles.takePicture] : 
              props.title === 'Share List' ? [styles.btn, styles.shareList] :
              [styles.btn, styles.orange]]}
      onPress={props.onPress}
    >
      <Text style={{ color: "white", textAlign:'center', fontWeight: 700, letterSpacing: 2}}>{props.title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  btn: {
    borderWidth: 3,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 50,
    borderRadius: 30,
  },
  red: {
    backgroundColor: "#c6122e",
    borderColor: "#d60000",
  },
  orange: {
    backgroundColor: "#363535",
  },
  takePicture: {
    position : "absolute",
    alignSelf: 'center',
    top: '88%',
    backgroundColor: "#363535",
  },
  shareList: {
    backgroundColor: "#ff8c00",
    width: 100,
    height: 40,
    borderRadius: 10,
    paddingBottom: 3,
  }
});