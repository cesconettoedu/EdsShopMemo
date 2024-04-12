import { StyleSheet, View, Text } from 'react-native';

export default function Question() {
  return (
    <View style={styles.container}>
      <Text>How to use</Text>
      <Text>This application works completely offline, saves the information on your cell phone and does not share it on the internet</Text>
      <Text>
        functionalities:
         - You can save the name of the products you need to buy to remember. You can click on them to expand the name if it is too long
         - You can click on the icons at the top of the app to show what you need from each place or click on All Items at the bottom and show them all.
         - Click on the cart to add a product to your list and choose the place you want to buy it.
         - By clicking on the photos in the lower left icon, you can add photos or take a photo from your library to save and remember which product it is.
         - By clicking on the photo you can expand it and read the entire description.

      </Text>
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
