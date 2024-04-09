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

import Photos from "../services/sqlite/Photos";

import Cam from "../../assets/icons/cam.png";
import Gallery from "../../assets/icons/galler.png";
import PhotoModalToSave from "../components/PhotoModalToSave";


export default function PhotoList({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalSingleVisible, setModalSingleVisible] = useState(false);
  

  const [bringPhotos, setBringPhotos] = useState();
  const [openSavePhotoComp, setOpenSavePhotoComp] = useState(false);

  const [choiseCamGal, setChoiseCamGal] = useState();

  //to pass to a single image modal
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
  
  

// got to open component to get photos from Device
  const getFromDevice = (o) =>{
    setChoiseCamGal(o);
    setOpenSavePhotoComp(true);
    setModalAddVisible(!modalAddVisible);
  }
  
// got to open component to get photos from Camera
  const getFromCamera = (o) =>{
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
    }, 2000);
  };

  useEffect(() => {
    fetchPhoto();
  }, [])
  

  return (
    <>
    {!openSavePhotoComp && 
    <>
      <View style={{backgroundColor: '#ff8c00', height: '5%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#f7f5f4'}}>Product photos</Text>
      </View>
      <View style={styles.container}>

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
                }}
              >
                <Image style={styles.imageSize} src={item.imageAddress} alt="error" />
                <Text ellipsizeMode='tail' style={styles.prodTitle}>{`${item.productName.substring(0, 12)}...`}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate('Home')}
            >
            <Text style={{ color: "white" }}>Close</Text>
          </TouchableOpacity>
            
          <TouchableOpacity
            style={styles.add}
            onPress={() => setModalAddVisible(true)}
            >
            <Text style={{ color: "white" }}>Add +</Text>
          </TouchableOpacity>
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
                  <TouchableOpacity
                    style={styles.closeModal}
                    onPress={() => setModalAddVisible(!modalAddVisible)}>
                    <Text>X</Text>
                  </TouchableOpacity>                                     
                 
                  <View style={styles.addChoiseCont}>
         
                    <TouchableOpacity
                      style={[styles.button ]}
                      onPress={() => getFromCamera('camera') }
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
                      onPress={() => getFromDevice('gallery') }
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
                  style={styles.closeModal}
                  onPress={() => setModalSingleVisible(!modalSingleVisible)}>
                   <Text>X</Text>
                </TouchableOpacity>     
             
             
              <Image
                src={singleImageUri}
                alt="image"
                style={{width: '100%', height: '70%'}}
              />
              <Text>{singleTitle}</Text>
              <Text>{singleDescript}</Text>



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
    width: "100%",
  },

  add: {
    borderWidth: 5,
    borderColor: "#f7f5f4",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    top: "93%",
    right: 20,
    height: 70,
    backgroundColor: "#ff8c00",
    borderRadius: 100,
  },
  back: {
    borderWidth: 5,
    borderColor: "#f7f5f4",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    top: "93%",
    right: 250,
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
