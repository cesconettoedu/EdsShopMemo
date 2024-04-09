import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Photos from "../services/sqlite/Photos";

import Click from "../../assets/clicktoimage.png";


function PhotoModalToSave({options}) {

  
  const [inputDescription, setinputDescription] = useState('');
  const [inputName, setinputName] = useState ('');
  //const [image, setImage] = useState('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FbestTodo-d6cd21a9-f53c-4e42-bd9c-7d149e2cca42/ImagePicker/a89e1996-58ce-48fc-9a81-b1e85ef2c591.jpeg');
  const [image, setImage] = useState('');




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



  

  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={{width: '77%',height: '60%', marginBottom: 20, borderWidth: 1, borderRadius: 8 }}
          onPress={pickImage}
        >
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
          maxLength={12}
          value={inputName}
          onChangeText={text => setinputName(text)} 
        />

        <TextInput 
          style={styles.input} 
          placeholder={"Others info"} 
          autoCapitalize='sentences'
          maxLength={30}
          value={inputDescription}
          onChangeText={text => setinputDescription(text)} 
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddProduct()}
        >
          <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
    </View>
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
  button: {
    backgroundColor: "#F6792B",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '50%'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
});
