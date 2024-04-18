import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from "./src/screens/Welcome";
import HomeScreen from "./src/screens/Home";
import PhotoList from "./src/screens/PhotoList";
import Question from "./src/screens/Question";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>

          <Stack.Screen 
            name="Welcome" 
            component={Welcome}
          />

          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
          />
        
          <Stack.Screen 
            name="PhotoList" 
            component={PhotoList} 
          />

          <Stack.Screen 
            name="Question" 
            component={Question} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f7f5f4",
    paddingTop: Platform.OS === 'android' ? 5 : 5
  },
 
});
