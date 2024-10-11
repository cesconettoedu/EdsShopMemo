import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, ImageBackground, Text } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Photos from "../services/sqlite/Photos";
import Btn from "./Btn";
import CameraOpen from "./CameraOpen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import Click from "../../assets/clicktoimage.png";

function PhotoModalToSave({options}) {

  const [inputDescription, setinputDescription] = useState('');
  const [inputName, setinputName] = useState ('');
  const [image, setImage] = useState('');
  const [cameraModal, setCameraModal] = useState(false)

  
//to get image from GALLERY ////////////////////////////////////////
  const pickImage = async () => {
    if(options.choiseCamGal === 'gallery') {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [12, 16],
        quality: 0.5,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri); 
      }
    }
    if(options.choiseCamGal === 'camera') {
      setCameraModal(true);
    }
  };

// to get image from CAMERA ////////////////////////////////////////
  const closeCamera = () => {
    setCameraModal(false);
  };
   const getUriFromCamera = (image) => {
    setImage(image)
  }



//to add device image uri to a database ////////////////////////////////////////
  const handleAddProduct = () => {
    if (image === '') {
      alert('Please choose a image');
    } else {

    Photos.create( {productName:inputName, description:inputDescription, imageAddress:image} )
      .then( console.log('Item created'))
      .then(options.backToList)
      .catch( err => console.log(err) )    
    }
  };
 

  return (
    <>
      {!cameraModal &&
        <View style={styles.container}>
            <TouchableOpacity
              style={{width: '77%',height: '60%', marginBottom: 20, borderWidth: 1, borderRadius: 8 }}
              onPress={pickImage}
              >
                <ImageBackground
                  source={Click}
                  style={{
                    height: '100%',
                    width: '100%',
                    opacity: 0.6,
                    position: 'absolute',
                    
                  }}
                />
              <Image
                src={image}
                alt="image"
                style={styles.imageCont}
                />
            </TouchableOpacity>
            
            <TextInput 
              style={styles.input} 
              placeholder={"Name of product"} 
              autoCapitalize='sentences'
              maxLength={20}
              value={inputName}
              onChangeText={text => setinputName(text)} 
              />

            <TextInput 
              style={styles.input} 
              placeholder={"Others info"} 
              autoCapitalize='sentences'
              maxLength={60}
              value={inputDescription}
              onChangeText={text => setinputDescription(text)} 
              />

            <View style={{flexDirection: 'row', width: '70%', justifyContent:'space-between', marginTop: 5}}>
              <View 
                style={{ justifyContent: 'flex-end'  }}
                >
                <TouchableOpacity
                  style={{alignItems: 'center', minWidth: 120, }}
                  onPress={options.backToList}
                >
                  <MaterialCommunityIcons name="progress-close" size={24} color="#6B6E78" />
                  <Text style={{fontSize: 12}}>Close</Text>
                </TouchableOpacity>
              </View>

              <View 
                style={{ justifyContent: 'flex-end', left: -5 }}
                >
                <TouchableOpacity
                  style={{alignItems: 'center', minWidth: 120, }}
                  onPress={() => handleAddProduct()}
                >
                  <AntDesign name="check" size={24} color="#6B6E78" />
                  <Text style={{fontSize: 12}}>Save</Text>
                </TouchableOpacity>





              </View>
            </View>
        </View>
      }
      {cameraModal && 
        <CameraOpen>
          {{closeCamera: closeCamera, getUriFromCamera:getUriFromCamera}}
        </CameraOpen> 
          
      }
    </>
  );
}

export default PhotoModalToSave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '10%'
  },
  imageCont: {
    flex: 1, 
    width: null,
    borderRadius: 8,  
  },
  input:{
    width: 280,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
});
