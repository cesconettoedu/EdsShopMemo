import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground} from "react-native";

import Btn from "../components/Btn"

export default function Tutorial({open}) {



  const allItems = require("../../assets/instructions/allitems.png");
  const cart = require("../../assets/instructions/cart.png");
  const photos = require("../../assets/instructions/photo.png");
  const byplace = require("../../assets/instructions/byplace.png");

  const [screens, setScreens] = useState(allItems);


  useEffect(() => {
    setScreens(allItems);
  }, [])





  return (
    <View style={styles.container}>
      {/* First instruction AllItems*/}
      <ImageBackground source={screens} resizeMode="cover" style={styles.image}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
         
          <Btn title={"Skip"} onPress={() => open(false)} />
          {screens === allItems && (
          
          <Btn title={"Next"} onPress={() => setScreens(cart)} />
          )}
          {screens === cart && (
          
          <Btn title={"Next"} onPress={() => setScreens(photos)} />
          )}
          {screens === photos && (
          
          <Btn title={"Next"} onPress={() => setScreens(byplace)} />
          )}
          {screens === byplace && (
          
          <Btn title={"End"} onPress={() => open(false)} />
          )}
        
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }, 
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
}); 
