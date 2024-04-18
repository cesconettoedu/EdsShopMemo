import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import Close from '../../assets/icons/close.png'


export default function Question({navigation}) {



  const questionsPage = [
    {
      id: 1,
      title: 'Functionalities',
      topics: 
        ['- You can save the name of the products you need to buy to remember. You can click on them to expand the name if it is too long.', 
         '- You can click on the icons at the top of the app to show what you need from each place or click on All Items at the bottom and show them all.', 
         '- Click on the cart to add a product to your list and choose the place you want to buy it.',
         '- By clicking on the photos in the lower left icon, you can add photos or take a photo from your library to save and remember which product it is.',
         '- By clicking on the photo you can expand it and read the entire description.'
        ]
    },
    {
      id: 2,
      title: 'Email for donations:',
      topics: ['duducesconetto@gmail.com ']
    },
    {
      id: 3,
      title: 'Others information:',
      topics: ['- This application works completely offline, saves the information on your cell phone and does not share it on the internet.']
    },
  ];


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginRight: 35, marginTop: 10}}
      >
        <Image
          source={Close}
          alt="close"
          style={{ width: 25, height: 25 }}
        />
      
      </TouchableOpacity> 


      
      <FlatList 
        data={questionsPage}
        renderItem={({ item }) => 
          <View  style={{ margin: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
      
              <FlatList 
                data={item.topics}
                renderItem={({ item }) => (
                  <Text style={{ marginLeft: 10, marginBottom: 3 }}>
                    {item}
                  </Text>
                )}    
              />

          </View>
        }
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Welcome')}
        style={{top: -50,}}
      >
        <Text style={styles.tutorial}>
          Watch tutorial
        </Text>
      </TouchableOpacity>

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
  tutorial: {
    
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
