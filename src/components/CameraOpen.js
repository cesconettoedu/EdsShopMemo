import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import Btn from './Btn';

const CameraOpen = (close) => {
  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  //const [image, setImage] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

    
  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null)
     // setImage(data.uri);
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

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

   
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,1)',}}>
      <View style={styles.cameraContainer}>
          <Camera 
                ref={ref => setCamera(ref)}
                style={styles.fixedRatio} 
                //type={type}
                ratio={'1:1'} />
        </View>
        {/* <Button
                title="Flip Image"
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
        </Button> */}
        <Btn 
          title="Take Picture" 
          onPress={() => takePicture()}
        />
        {/* {image && 
          <Image source={{uri: image}} style={{flex:1}}
        />} */}
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
})