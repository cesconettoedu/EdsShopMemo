import React, { useEffect } from "react";
import { StyleSheet, View, Text} from "react-native";


function Welcome({navigation}) {

  const justEnter = () => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 2000);
  };

  useEffect(() => {
    justEnter();
  }, [])

  return (
    <>
      <Text>Welcome</Text>
    </>
  )
}

export default Welcome