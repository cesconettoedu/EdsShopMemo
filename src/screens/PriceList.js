import { StyleSheet, View, Text } from 'react-native';

export default function PriceList() {
  return (
    <View style={styles.container}>
      <Text>
        PriceList
        Next Step
        List to remember the last price that you pay on the product
      </Text>
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
