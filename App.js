import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./src/screens/Home";
import PhotoCam from "./src/screens/PhotoCam";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{headerShown: false}} 
          />
        
          <Stack.Screen 
            name="PhotoCam" 
            component={PhotoCam} 
            options={{headerTitle: "Back"}}
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
