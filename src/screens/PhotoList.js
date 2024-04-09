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
import * as ImagePicker from "expo-image-picker";
import Photos from "../services/sqlite/Photos";


import ImgTest from "../../assets/imageTest.jpg";
import Cam from "../../assets/icons/cam.png";
import Gallery from "../../assets/icons/galler.png";


export default function PhotoList() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  
  const [inputDescription, setinputDescription] = useState('um teste de description');
  const [inputName, setinputName] = useState ('teste title');
  const [image, setImage] = useState('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FbestTodo-d6cd21a9-f53c-4e42-bd9c-7d149e2cca42/ImagePicker/a89e1996-58ce-48fc-9a81-b1e85ef2c591.jpeg');

  const [bringPhotos, setBringPhotos] = useState();



  //to get image from device ////////////////////////////////////////
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [12, 16],
      quality: 0.5,
    });

   // console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };


  //to add device image uri to a database ////////////////////////////////////////
  const handleAddProduct = () => {
    Photos.create( {productName:inputName, description:inputDescription, imageAddress:image} )
      .then( console.log('Item created'))
      .catch( err => console.log(err) )    
  };
  const savehandleAddProduct =() => {
    pickImage();
    handleAddProduct();
    setModalAddVisible(!modalAddVisible);
  }



//to bring all images to the database ////////////////////////////////////////
const fetchPhoto = () => { 
    const allP = [];
    
    Photos.bringAllPhotos()
      .then((photos) => photos.forEach((c) => allP.push(c)))
      .then(setBringPhotos(allP))
    }
  
  

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
      fetchPhoto();
      setRefreshing(false);
    }, 2000);
  };



  return (
    <>
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
              //  onPress={() => {}}
              >
                <Image style={styles.imageSize} src={item.imageAddress} alt="error" />
                <Text style={styles.prodTitle}>{item.productName}</Text>
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
                      onPress={savehandleAddProduct 
                       //  setModalAddVisible(!modalAddVisible)
                   
                        
                      }
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
