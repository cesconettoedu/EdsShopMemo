import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import Close from '../../assets/icons/close.png'
import Tutorial from '../components/Tutorial';
import TutoImages from "../components/TutoImages";

export default function Question({navigation}) {

  const [ tutorial, setTutorial] = useState(false);
  const [ whichTutorial, setWhichTutorial] = useState();

  const close = () => {
    setTutorial(false);
  }
  
  const wich = (w) => {
    setWhichTutorial(w);
  }

  const questionsPage = [
    {
      id: 1,
      title: 'Functionalities:',
      topics: 
        ['- Add, delete or edit an item in the list.', 
         '- Choose to see all lists together or separate by location.', 
         '- Add or delete the photo and description of a product taken on the camera or in the cell phone gallery.',
         '- Send the complete list or selected list to someone else.',
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
    <>
      {!tutorial &&
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginRight: 35, marginTop: 10}}
          >
            <Image
              source={Close}
              alt="X"
              style={{ width: 25, height: 25 }}
            />
          
          </TouchableOpacity> 

        
          <FlatList 
            data={questionsPage}
            renderItem={({ item }) => 
              <View  style={{ margin: 20 }}>
                <Text style={styles.title}>{item.title}</Text>
          
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

        
          <View style={styles.tutorialContainer}>
            <Text style={[styles.title, styles.tutoTitle]}>Watch tutorial</Text>
            
            <View style={{padding:20, flexDirection: 'row', gap: 20, flexWrap: 'wrap', justifyContent: 'center'}}>
           
              <TouchableOpacity
                style={styles.btnTutorial}
                onPress={() => {setTutorial(true); wich(addDelUp)}}
              >
                <Text style={styles.textBtnTutorial}>Add, Delete Update Item</Text>              
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnTutorial}
                onPress={() => {setTutorial(true); wich(chooseList)}}
              >
                <Text style={styles.textBtnTutorial}>Choose Lists</Text>           
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnTutorial}
                onPress={() => {setTutorial(true); wich(addDelPhotos)}}
              >
                <Text style={styles.textBtnTutorial}>Add, Delete Photos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnTutorial}
                onPress={() => {setTutorial(true); wich(shareList)}}
              >
                <Text style={styles.textBtnTutorial}>Share List</Text>
              </TouchableOpacity>

            </View>
          </View>





        </View>
      }
      {tutorial &&
        <Tutorial
          props={{close, whichTutorial}}
          
        />
      }
    </>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5
  },  

  // tutorial: {
  //   fontSize: 20,
  //   color: 'blue',
  //   textDecorationLine: 'underline'
  // },


// tutorial part

tutorialContainer: {
  backgroundColor: '#afcbca', 
  width: '100%', 
  height: '30%', 
  justifyContent: 'center', 
  marginBottom: 10
},
tutoTitle:{
  textAlign: 'center',
  textDecorationLine: 'underline'
},
btnTutorial:{
  backgroundColor: '#ff8c00', 
  width: '35%', 
  height: '50%', 
  borderRadius: 4
},
textBtnTutorial: {
  color:'#f7f5f4',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 3,
},





});
