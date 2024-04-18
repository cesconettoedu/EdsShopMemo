import React, { useEffect } from "react";
import { StyleSheet, View, Image} from "react-native";

import EuIcon from "../../assets/icons/eulogoSquareTodo.png";
import Load from "../../assets/gif/load.gif";

function Welcome({navigation}) {

  const justEnter = () => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 1000);
  };

  useEffect(() => {
     justEnter();
  }, [])

  return (
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
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15
  }, 
  text: {
    color: '#fd7014',
    fontSize: 24,
  }
})