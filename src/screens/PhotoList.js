import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  RefreshControl,
  Modal,
  
} from "react-native";

import ImgTest from "../../assets/imageTest.jpg";
import Cam from "../../assets/icons/cam.png";
import Gallery from "../../assets/icons/galler.png";


export default function PhotoList() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);


  const dataTest = [
    {
      id: 1,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 2,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 3,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 4,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 5,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 6,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 7,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 8,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 9,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 10,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 11,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 12,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 13,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 14,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
    {
      id: 15,
      image: "../../assets/imageTest.jpg",
      textT: "123456789012",
      textD: "details",
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      //add function to get all photos on data base again
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={dataTest}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={3}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.imageCont}>
              {/* {console.log(item)}  */}
              <TouchableOpacity
              //  onPress={() => {}}
              >
                <Image style={styles.imageSize} source={ImgTest} alt="error" />
                <Text style={styles.prodTitle}>123456789012</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.add}
          onPress={() => setModalAddVisible(true)}
        >
          <Text style={{ color: "white" }}>Add +</Text>
        </TouchableOpacity>
        {/* Modal to open a text input */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddVisible}
            onRequestClose={() => {
              setModalAddVisible(!modalAddVisible);
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>   
                  <TouchableOpacity
                    style={styles.closeModal}
                    onPress={() => setModalAddVisible(!modalAddVisible)}>
                    <Text>X</Text>
                  </TouchableOpacity>                                     
                 
                  <View style={styles.addChoiseCont}>
                   
                    <TouchableOpacity
                      style={[styles.button ]}
                      onPress={() => {setModalAddVisible(!modalAddVisible) 
                      //;handleAddProd()
                      }}
                    >
                      <Image
                        source={Cam}
                        alt="camera"
                        style={{ width: 65, height: 65 }}
                      />
                      <Text>Camera</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.button ]}
                      onPress={() => {setModalAddVisible(!modalAddVisible) 
                      //;handleAddProd()
                      }}
                    >
                      <Image
                        source={Gallery}
                        alt="gallery"
                        style={{ width: 65, height: 65 }}
                      />
                      <Text>Gallery</Text>
                    </TouchableOpacity>

                  </View>
                  
                 
                </View>
              </View>

          </Modal>
        
      </View>



















    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.96,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    height: "50%",
  },
  imageCont: {
    margin: 5,
    marginBottom: 20,
  },
  imageSize: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  prodTitle: {
    fontWeight: "bold",
  },

  add: {
    borderWidth: 5,
    borderColor: "#f7f5f4",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    top: "95%",
    right: 20,
    height: 70,
    backgroundColor: "#ff8c00",
    borderRadius: 100,
  },


//  Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 400,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(58, 55, 49, 0.95)' //transparent
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: '#f7f5f4',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addChoiseCont: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    gap: 40    
  },
   button: {
    backgroundColor: "#F6792B",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    width: '50%'
    
  },
  textStyle:{

  },
  closeModal:{
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    left: 140,
    top: -30,
    height: 30,
    paddingTop: 3,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },




});
