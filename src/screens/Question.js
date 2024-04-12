import { StyleSheet, View, Text } from 'react-native';

export default function Question() {
  return (
    <View style={styles.container}>
      <Text>How to use</Text>
      <Text>email for donation</Text>
    </View>
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
