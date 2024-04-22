import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground} from "react-native";

import Btn from "../components/Btn"

export default function Tutorial({open}) {



  const allItems = require("../../assets/instructions/01allitems.png");
  const cart = require("../../assets/instructions/02cart.png");
  const photos = require("../../assets/instructions/03photo.png");
  const byplace = require("../../assets/instructions/04byplace.png");
  const openItemEdit = require("../../assets/instructions/05openItemEdit.png");
  const openItemEditA = require("../../assets/instructions/06-01openItemEdit.png");
  const openItemEditB = require("../../assets/instructions/06-02openItemEdit.png");

  const [screens, setScreens] = useState(allItems);


  useEffect(() => {
    setScreens(allItems);
  }, [])





  return (
    <View style={styles.container}>
      {/* First instruction AllItems*/}
      <ImageBackground source={screens} resizeMode='contain' style={styles.image}>
      </ImageBackground>

      <View>
        <View style={{ flexDirection: "row", gap: 90, margin:20 }}>
         
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

          <Btn title={"Next"} onPress={() => setScreens(openItemEdit)} />
          )}
          {screens === openItemEdit && (

          <Btn title={"Next"} onPress={() => setScreens(openItemEditA)} />
          )}
          {screens === openItemEditA && (
          
          <Btn title={"Next"} onPress={() => setScreens(openItemEditB)} />
          )}
          {screens === openItemEditB && (
          
          <Btn title={"End"} onPress={() => open(false)} />
          )}
        
        </View>
            
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 10
  }, 
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
}); 
