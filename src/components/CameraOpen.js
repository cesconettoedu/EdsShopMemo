import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import Btn from './Btn';
import Load from "../../assets/gif/Spinner3.gif";

const CameraOpen = (close) => {
  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  //const [image, setImage] = useState(null);
  //const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [load, setLoad] = useState(false); 

    
  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null)
      close.children.getUriFromCamera(data.uri);
      goBack();
    }
  }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

  const goBack = () => {
    close.children.closeCamera(false)
  }


  const justLoad = () => {
    setLoad(true);
      setTimeout(() => {
        setLoad(false);
      }, 2500);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await requestPermission();
      requestPermission(cameraStatus.status === 'grant permission');
    })();
  }, []);

   
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,1)',}}>
        {load &&
            <Image
            source={Load}
            alt="loading"
            style={styles.loadFake}
            /> 
          }
      <View style={styles.cameraContainer}>
          <Camera 
                ref={ref => setCamera(ref)}
                style={styles.fixedRatio} 
                //type={type}
                ratio={'1:1'} />
        </View>

        <Btn 
          title="Take Picture" 
          onPress={() => {takePicture(); justLoad()}}
        />

    </View>
  )
}

export default CameraOpen;

const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center", 
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 0.8,   
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
})