import React, { useState, useEffect } from "react";
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

import Fontisto from '@expo/vector-icons/Fontisto';

import Photos from "../services/sqlite/Photos";

import Cam from "../../assets/icons/camW.png";
import Gallery from "../../assets/icons/gallerW.png";
import PhotoModalToSave from "./PhotoModalToSave";
import Btn from "./Btn";
import Load from "../../assets/gif/Spinner3.gif";




export default function LinkPhotoList({choise}) {

  const [refreshing, setRefreshing] = React.useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);

  const [bringPhotos, setBringPhotos] = useState();
  const [openSavePhotoComp, setOpenSavePhotoComp] = useState(false);

  const [choiseCamGal, setChoiseCamGal] = useState();

  const [singleUri, setSingleUri] = useState();

  const [load, setLoad] = useState(false); 
  

//to bring all images to the database ////////////////////////////////////////
  const fetchPhoto = () => { 
    const allP = [];
    
    Photos.bringAllPhotos()
      .then((photos) => photos.forEach((c) => allP.push(c)))
      .then(setBringPhotos(allP))
    }

  // got to open component to get photos from Device
  const getFromCamOrGall = (o) =>{
    setChoiseCamGal(o);
    setOpenSavePhotoComp(true);
    setModalAddVisible(!modalAddVisible);
  
  }
  
  const backToList = () => {
    setOpenSavePhotoComp(false);
    onRefresh()
  }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchPhoto();
      setRefreshing(false);
    }, 1000);
  };
 
  useEffect(() => {
    fetchPhoto();
  }, [])

// Essa promisse 'e para mandar o URI da photos para o ItemsAddUpDate.js 
  const fetchUriToLink = new Promise((resolve, reject) => {
    setTimeout(() => {
      const numberUri = singleUri
      if (numberUri) {
        resolve(numberUri);
      }
    }, 500);

  })

  fetchUriToLink.then((result) => {
    choise.handleUriToLink(result); 
    choise.closeLinkPhotoList()
  }).catch((error) => {
    console.error('Erro ao executar a promessa:', error);
  });
  

  const justLoad = () => {
    setLoad(true);
      setTimeout(() => {
        setLoad(false);
      }, 500);
    };
   

  return (
    <>
      {!openSavePhotoComp && 
        <>
          <View style={{backgroundColor: '#363535', height: '5%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#f7f5f4'}}>Select Photo</Text>
          </View>
          <View style={styles.container}>
         
         
          {load &&
            <Image
            source={Load}
            alt="loading"
            style={styles.loadFake}
            /> 
          }


            <FlatList
              data={bringPhotos}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              numColumns={3}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.imageCont}>
                  
                  <TouchableOpacity
                    onPress={() => {
                      setSingleUri(item.imageAddress);
                      justLoad();
                    }}
                  >
                    <Image style={styles.imageSize} src={item.imageAddress} alt="error" />
                    <Text ellipsizeMode='tail' style={styles.prodTitle}>{`${item.productName.substring(0, 11)}...`}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <View style={{flexDirection: 'row',justifyContent:'space-around', paddingTop: 10, bottom: -60}}>

              <View style={{ justifyContent: 'flex-end'}}>
                <Btn 
                  title={'Close'}
                  onPress={choise.closeLinkPhotoList}
                />
              </View>
                
              <View style={{ justifyContent: 'flex-end' }}>
                <Btn 
                  title={'Add +'}
                  onPress={() => setModalAddVisible(true)}
                />
              </View>

            </View>
            
      {/*---------------------------- Modal to open a Camera or Gallery Choice ----------------------- */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddVisible}
                onRequestClose={() => {
                  setModalAddVisible(!modalAddVisible);
                }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{left: '55%'}}>
                      <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => setModalAddVisible(!modalAddVisible)}>
                        <Fontisto name="close" size={30} color="black" />
                      </TouchableOpacity>                                     
                      </View>                      
                    
                      <View style={styles.addChoiseCont}>
            
                        <TouchableOpacity
                          style={[styles.button ]}
                          onPress={() => getFromCamOrGall('camera') }
                        >
                          <Image
                            source={Cam}
                            alt="camera"
                            style={{ width: 65, height: 65 }}
                          />
                          <Text style={{color:'#f7f5f4',  fontWeight: 500, letterSpacing: 2}}>Camera</Text>
                        </TouchableOpacity>
                              
                        <TouchableOpacity
                          style={[styles.button ]}
                          onPress={() => getFromCamOrGall('gallery') }
                        >
                          <Image
                            source={Gallery}
                            alt="gallery"
                            style={{ width: 65, height: 65 }}
                          />
                          <Text style={{color:'#f7f5f4',  fontWeight: 500, letterSpacing: 2}}>Gallery</Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View>
              </Modal>

          </View>
        </>
      }
      { openSavePhotoComp && 
        <PhotoModalToSave 
          options={{choiseCamGal, backToList}}
        />
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    padding: 10,
    height: "50%",
    backgroundColor: '#EEEEEE'
  },
  loadFake:{
    width: 40,
    height: 40,
    position: 'absolute',
    zIndex: 9, 
    alignSelf: 'center',
    backgroundColor: 'white', 
    borderRadius: 50,
    marginTop: 30, 
    padding: 20
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
    width: "95%",
    alignSelf: "center",
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
    flexDirection: 'column',
    width: '90%',
    margin: 20,
    backgroundColor: '#f7f5f4',
    borderRadius: 20,
    paddingBottom: 35,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 5,
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
    backgroundColor: "#363535",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    width: '50%'
    
  },
  closeModal:{
    marginBottom: 25
  },




});
