import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image} from "react-native";

import EuIcon from "../../assets/icons/eulogoSquareTodo.png";
import Load from "../../assets/gif/load.gif";

function Welcome({navigation}) {
  const [load, setLoad] = useState(true);

  const justEnter = () => {
    setTimeout(() => {
      setLoad(false);
      // navigation.navigate('Home');
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
    {!load &&
      <View style={styles.container}>
        <Image
          source={EuIcon}
          alt="euicon"
          style={{width: 150, height: 150}}
          />
             
          {/* colocar cada screenshot com um botao de pula para o proximo e um de SKip tudo, junto sempre */}



      </View>
    }
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
    padding: 15
  }, 
  text: {
    color: '#fd7014',
    fontSize: 24,
  }
})