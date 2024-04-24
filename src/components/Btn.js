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
      <Text style={{ color: "white", textAlign:'center' }}>{props.title}</Text>
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
  },
  takePicture: {
    position : "absolute",
    alignSelf: 'center',
    top: '88%',
    backgroundColor: "#ff8c00",
  },
  shareList: {
    backgroundColor: "#ff8c00",
    width: 100,
    height: 40,
    borderRadius: 10,
    paddingBottom: 3,
  }
});