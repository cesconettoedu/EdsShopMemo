import { StyleSheet, View, Text } from 'react-native';

export default function PriceList() {
  return (
    <View style={styles.container}>
      <Text>PriceList</Text>
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
