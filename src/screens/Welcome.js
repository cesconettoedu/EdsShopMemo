import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

import EuIcon from "../../assets/icons/eulogoSquareTodo.png";
import Load from "../../assets/gif/load.gif";

function Welcome({navigation}) {

  const [load, setLoad] = useState(true);

  const justEnter = () => {
    setTimeout(() => {
      setLoad(false);
      navigation.navigate("Home")
    }, 1000);
  };

  useEffect(() => {
     justEnter();
   
  }, [])

  return (
    <>
    {load &&
      <View style={styles.container}>
        <Image
          source={EuIcon}
          alt="euicon"
          style={{width: 150, height: 150}}
          />
        <Image
          source={Load}
          alt="loading"
          style={{width: 150, height: 150}}
          />
        
      </View>
    }
    {/* {!load &&

    } */}
    </>
  )
}

export default Welcome

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
})