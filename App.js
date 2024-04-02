import { StyleSheet, View, SafeAreaView } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home/>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
