import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Modal, ScrollView, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import List from "../components/List";

import CartIcon from "../../assets/icons/addItem.png";
import PhotoIcon from "../../assets/icons/PhotoGallery.png";
import AllIcon from "../../assets/icons/all.png";
import AnyIcon from "../../assets/icons/any3.png";
import CostcoIcon from "../../assets/icons/costco3.png";
//import CostcoIcon from "../../assets/icons/test/largeMarket.png";
import DollaramaIcon from "../../assets/icons/dollarama3.png";
//import DollaramaIcon from "../../assets/icons/test/dollar1.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";
import Party from "../../assets/icons/party.png";
import Question from "../../assets/icons/question2.png";
import Ad from "../../assets/gif/PLACE-YOUR-ADVERT-HERE-2.gif";
import EuIcon from "../../assets/icons/eulogoSquareTodo.png";
import Load from "../../assets/gif/load.gif";
import ShareList from "../../assets/icons/shareList4.png";

import ItemAddUpdate from "../components/ItemAddUpdate";

import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Home({navigation}) {
  
  const [load, setLoad] = useState(true); 

  const [showList, setShowList] = useState("*");

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [productName, setProductName] = useState(null);


  let testChange = "*";
  

  const justEnter = () => {
      setTimeout(() => {
        setLoad(false);
        navigation.navigate("Home")

      }, 1000);
    };

  useEffect(() => {
      justEnter();
    
    }, [])


  
  const ListSheradRef = useRef(null);
 // Function to trigger the function in the child component
  const triggerShareFunction = () => {
    // Call the function inside the child component using the ref
    ListSheradRef.current && ListSheradRef.current.triggerShareFunction();
  };



  return (
    <>
      {load &&
        <View style={styles.containerLoad}>
          <Image
            source={EuIcon}
            alt="euicon"
            style={{width: 150, height: 150}}
          />
          <Image
            source={Load}
            alt="loading"
            style={{width: 150, height: 150}}
          />   
        </View>
      }
      {!load &&
        <View style={styles.container}>
          <StatusBar style="auto" /> 
            {/* this is a view of the HEADER free place to put something */}   
            <View style={styles.viewTopPlus}>
              <TouchableOpacity
                //onPress={ }
               >
                <Image
                  source={Ad}
                  alt="ad"
                  style={{width: 200, height: 50, left: 10}}
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={triggerShareFunction}
              >
                <Image
                  source={ShareList}
                  alt="share list"
                  style={{width: 38, height: 38, left: 10}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Question')}
              >
                <Image
                  source={Question}
                  alt="question"
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
            </View>
    
           {/* this is a view of the Top part where have List of itens */}
            <View style={styles.viewTop}>
              <View>
                <List 
                  data={{showList, productName}}
                  refs={ListSheradRef}
                />           
              </View>
            </View>

            {/* this is a view of the Middle part where have Store Icons to show SINGLE Lists */}
            <View style={styles.viewMiddle}>
                <ScrollView
                  horizontal={true}
                  style={{ marginLeft:2, marginRight:2, paddingLeft: 10 }}
                >
                  <View style={styles.storeContainer}> 

                    <TouchableOpacity
                      onPress={() => {setShowList("*"); testChange = "*"}}        
                    >
                      <Image
                        source={AllIcon}
                        alt="allitens"
                        style={showList === "*" ?  styles.storeIconsActive : styles.storeIcons}  
                      />
                    </TouchableOpacity> 

                    <TouchableOpacity
                      onPress={() => {setShowList("Any"); testChange = "Any"}}            
                    >
                      <Image
                        source={AnyIcon}
                        alt="anymarket"
                        style={showList === "Any" ?  styles.storeIconsActive : styles.storeIcons} 
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {setShowList("Costco"); testChange = "Costco"}}  
                    >
                      <Image
                        source={CostcoIcon}
                        alt="costco"
                        style={showList === "Costco" ?  styles.storeIconsActive : styles.storeIcons}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {setShowList("Dollarama"); testChange = "Dollarama"}}
                    >
                      <Image
                        source={DollaramaIcon}
                        alt="dollarama"
                        style={showList === "Dollarama" ?  styles.storeIconsActive : styles.storeIcons} 
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {setShowList("Pharmacy"); testChange = "Pharmacy"}}
                    >
                      <Image
                        source={PharmacyIcon}
                        alt="pharmacy"
                        style={showList === "Pharmacy" ?  styles.storeIconsActive : styles.storeIcons} 
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {setShowList("Party"); testChange = "Party"}}
                    >
                      <Image
                        source={Party}
                        alt="Party"
                        style={showList === "Party" ?  styles.storeIconsActive : styles.storeIcons} 
                      />
                    </TouchableOpacity>
                
                  
                   {/* just to create a space after last icon, its a invisible space, quebra galho */}
                    <Image
                      source={Party}
                      alt="Party"
                      style={{width:0, height:0}} 
                    />
                  </View>
                </ScrollView>
            </View>

      {/* this is a view of the Bottom part where have PhotoIcon - AllItens - CartIcon */}
            <View style={styles.viewBottom}>
              
                <TouchableOpacity
                  style={{alignItems: 'center', minWidth: 120, }}
                  onPress={() => navigation.navigate('PhotoList')}
                >
                  {/* <Image
                    source={PhotoIcon}
                    alt="photoicon"
                    resizeMode="contain"
                    style={{ width: 120, height: 45 }}
                  /> */}
                  <FontAwesome size={26} name="photo" color="#6B6E78" />
                  <Text>Photo Gallery</Text>
                </TouchableOpacity>
              
                <TouchableOpacity
                  style={{alignItems: 'center', minWidth: 120, }}
                  onPress={() => setModalVisibleAdd(true) }
                >
                  {/* <Image
                    source={CartIcon}
                    alt="carticon"
                    resizeMode="contain"
                    style={{ width: 120, height: 45 }}
                  /> */}
                  <FontAwesome size={36} name="plus" color="#6B6E78" />
                   <Text>Add item</Text>
                </TouchableOpacity>

              {/*--------- Modal ----------------- to open a Component to insert info */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisibleAdd}
                  onRequestClose={() => {
                    setModalVisibleAdd(!modalVisibleAdd);
                  }}>

                  <ItemAddUpdate
                    modalVisibleAdd={setModalVisibleAdd}            
                  />
                </Modal> 

            </View>
          </View>
      }
    </>
  );
}

const styles = StyleSheet.create({

  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }, 

  container: {
    flex: 1,
  }, 
  viewTopPlus:{
   backgroundColor: "#f7f5f4",
    flex: 0.8, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },

// viem Top part where show the list of products  
  viewTop: {
    flex: 5,
  },

// view with Store Icons  
  viewMiddle: {
    flex: 0.8,
  },
  storeContainer:{
    flex:1,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  storeIcons: {
    width: 55, 
    height: 55,
  },
  storeIconsActive: {
    width: 70, 
    height: 70,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#7A7D88",
  },
  
// view with PhotoIcon - AllItens - CartIcon  
  viewBottom: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
    alignItems: "center",
    backgroundColor:"#ffffff"
  },
  allItens: {
    borderWidth: 1, 
    borderColor: "lightgrey",
    borderRadius: 15, 
  },
  allItensaActive: {
    backgroundColor: "#ffffff",
    borderWidth: 3, 
    borderColor: "#7A7D88",
    borderRadius: 8, 
  },

});
