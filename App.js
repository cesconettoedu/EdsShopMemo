import { StyleSheet, View, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./src/screens/Home";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      
        <Home />
      
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
