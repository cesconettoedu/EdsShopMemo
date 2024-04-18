import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground} from "react-native";

import Btn from "../components/Btn"

import EuIcon from "../../assets/icons/eulogoSquareTodo.png";
import Load from "../../assets/gif/load.gif";


function Welcome({navigation}) {
  const [load, setLoad] = useState(true);
  const [imageOpen, setImageOpen] = useState("../../assets/instructions/allitems.png");

  const allItems = require("../../assets/instructions/allitems.png");
  const cart = require("../../assets/instructions/cart.png");
  const photos = require("../../assets/instructions/photo.png");
  const byplace = require("../../assets/instructions/byplace.png");


  const [screens, setScreens] = useState(allItems);




  const justEnter = () => {
    setTimeout(() => {
      setLoad(false);
      // navigation.navigate('Home');
    }, 1000);
  };



  useEffect(() => {
     justEnter();
     setScreens(allItems);
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
        
        {/* First instruction AllItems*/}
        <ImageBackground 
          source={screens}
          resizeMode="cover" 
          style={styles.image}
        >
          <View style={{flexDirection:'row', justifyContent: 'space-around'}} >
            <Btn 
              title={'Skip'}
              onPress={() => navigation.navigate('Home')}
            />
            {screens === allItems &&
              <Btn 
                title={'Next'}
                onPress={() => setScreens(cart) }
              />
            }
            {screens === cart &&
              <Btn 
                title={'Next'}
                onPress={() => setScreens(photos) }
              />
            }
            {screens === photos &&
              <Btn 
                title={'Next'}
                onPress={() => setScreens(byplace) }
              />
            }
            {screens === byplace &&
              <Btn 
                title={'End'}
                onPress={() => navigation.navigate('Home')}
              />
            }

          </View>
        </ImageBackground>

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
  }, 
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
})