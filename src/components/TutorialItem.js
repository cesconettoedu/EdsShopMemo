import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, useWindowDimensions } from "react-native";


export default function TutorialItem({ item }) {

  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>
      <Text style={styles.num}>{item.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  image: {
    flex: 0.95,
    justifyContent: 'center',
  },
  num: {
    fontSize: 25,
    textAlign: 'center',
  }
}); 
