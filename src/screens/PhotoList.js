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
import * as Sharing from 'expo-sharing';
import Fontisto from '@expo/vector-icons/Fontisto';
import Photos from "../services/sqlite/Photos";

import Cam from "../../assets/icons/camW.png";
import Gallery from "../../assets/icons/gallerW.png";
import PhotoModalToSave from "../components/PhotoModalToSave";
import Btn from "../components/Btn";
import SharePhoto from "../../assets/icons/shareList4.png";




export default function PhotoList({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalSingleVisible, setModalSingleVisible] = useState(false);
  const [modalDelConf, setModalDelConf] = useState(false);

  const [bringPhotos, setBringPhotos] = useState();
  const [openSavePhotoComp, setOpenSavePhotoComp] = useState(false);

  const [choiseCamGal, setChoiseCamGal] = useState();

  //to pass to a single image modal
  const [singleId, setSingleId] = useState();
  const [singleImageUri, setSingleImageUri] = useState();
  const [singleTitle, setSingleTitle] = useState();
  const [singleDescript, setSingleDescript] = useState();


//to bring all images to the database ////////////////////////////////////////
  const fetchPhoto = () => { 
    const allP = [];
    
    Photos.bringAllPhotos()
      .then((photos) => photos.forEach((c) => allP.push(c)))
      .then(setBringPhotos(allP))
    }

//to Delete all images to the database ////////////////////////////////////////
  const deletePhoto = (id) => { 
    Photos.remove(id)
      .then(setModalSingleVisible(!modalSingleVisible))
      .then( onRefresh() )
      .catch( err => console.log(err) )
  }


// got to open component to get photos from Device
  const getFromCamOrGall = (o) =>{
    setChoiseCamGal(o);
    setOpenSavePhotoComp(true);
    setModalAddVisible(!modalAddVisible);
  
  }
  

  const shareImage = (foto) => {
   Sharing.shareAsync(foto);
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
  

  return (
    <>
      {!openSavePhotoComp && 
        <>
          <View style={{backgroundColor: '#363535', height: '5%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#f7f5f4'}}>Product photos</Text>
          </View>
          <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
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
                        setModalSingleVisible(!modalSingleVisible), 
                        setSingleImageUri(item.imageAddress),
                        setSingleTitle(item.productName),
                        setSingleDescript(item.description)
                        setSingleId(item.id);
                      }}
                      >
                      <Image style={styles.imageSize} src={item.imageAddress} alt="error" />
                      <Text ellipsizeMode='tail' style={styles.prodTitle}>{`${item.productName.substring(0, 11)}...`}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent:'space-around', paddingTop:10, bottom: -10}}>

              <View >
                <Btn 
                  title={'Close'}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
                
              <View >
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

          {/*---------------------------- Modal to open a Single Item ----------------------- */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalSingleVisible}
                onRequestClose={() => {
                  setModalSingleVisible(!modalSingleVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}> 
                  <TouchableOpacity
                    onPress={() => {shareImage(singleImageUri)}}
                    style={{position: 'absolute', alignSelf: 'flex-end', right: 3, top: 3}}
                  >
                    <Image
                      source={SharePhoto}
                      alt="share photo"
                      style={{width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: '#0580bd'}}
                    />
                  </TouchableOpacity>  
                  <Image
                    src={singleImageUri}
                    alt="image"
                    style={{width: '100%', height: '67%', borderRadius: 5, marginBottom: 20, marginTop: 35}}
                  />
                  <Text 
                    style={{marginBottom: 10, fontSize: 20, }}
                    numberOfLines={1}
                  >{singleTitle}</Text>
                  <Text 
                    style={{fontSize: 15, }}
                    numberOfLines={2}
                  >{singleDescript}</Text>

                  <View style={{flexDirection: 'row', gap:40, marginTop: 10, top: 10}}>
                    <Btn 
                      title={'Delete'}
                      onPress={() => {setModalDelConf(!modalDelConf)}}
                    />
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalDelConf}
                        onRequestClose={() => {
                          setModalDelConf(!modalDelConf);
                        }}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>   
                            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>Confirm delete?</Text>
                            <View style={{flexDirection: 'row', gap:40, marginTop: 10, top: 10}}>
                          
                            <Btn 
                              title={'Yes'}
                              onPress={() => {deletePhoto(singleId); setModalDelConf(!modalDelConf)}}
                            />
                            <Btn 
                              title={'Cancel'}
                              onPress={() => setModalDelConf(!modalDelConf)}
                            />

                          </View>
                          </View> 
                        </View>
                      </Modal>

                    <Btn 
                      title={'Close'}
                      onPress={() => setModalSingleVisible(!modalSingleVisible)}
                    />
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
    //backgroundColor: 'red'
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
  }

});
