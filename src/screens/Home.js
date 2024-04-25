import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Modal, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import List from "../components/List";

import CartIcon from "../../assets/icons/cart4.png";
import PhotoIcon from "../../assets/icons/photoIcon3.png";
import AllIcon from "../../assets/icons/all.png";
import AnyIcon from "../../assets/icons/any3.png";
import CostcoIcon from "../../assets/icons/costco3.png";
//import CostcoIcon from "../../assets/icons/test/largeMarket.png";
import DollaramaIcon from "../../assets/icons/dollarama3.png";
//import DollaramaIcon from "../../assets/icons/test/dollar1.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";
import Question from "../../assets/icons/question2.png";
import Ad from "../../assets/gif/PLACE-YOUR-ADVERT-HERE-2.gif";
import EuIcon from "../../assets/icons/eulogoSquareTodo.png";
import Load from "../../assets/gif/load.gif";
import Dots3 from "../../assets/icons/3dots2.png";
import ShareList from "../../assets/icons/shareList4.png";

import ItemAddUpdate from "../components/ItemAddUpdate";




export default function Home({navigation}) {

  const [load, setLoad] = useState(true); 

  const [showList, setShowList] = useState("*");

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [productName, setProductName] = useState(null);


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

      {/* this is a view of the Middle part where have Store Icons to show the product */}
            <View style={styles.viewMiddle}>
              <View style={styles.storeContainer} >          
                <TouchableOpacity
                  onPress={() => {setShowList("Any")}}            
                  >
                  <Image
                    source={AnyIcon}
                    alt="anymarket"
                    style={showList === "Any" ?  styles.storeIconsActive : styles.storeIcons} 
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {setShowList("Costco")}}  
                  >
                  <Image
                    source={CostcoIcon}
                    alt="costco"
                    style={showList === "Costco" ?  styles.storeIconsActive : styles.storeIcons}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {setShowList("Dollarama")}}
                  >
                  <Image
                    source={DollaramaIcon}
                    alt="dollarama"
                    style={showList === "Dollarama" ?  styles.storeIconsActive : styles.storeIcons} 
                  />
                </TouchableOpacity>

                  <TouchableOpacity
                  onPress={() => {setShowList("Pharmacy")}}
                  >
                  <Image
                    source={PharmacyIcon}
                    alt="pharmacy"
                    style={showList === "Pharmacy" ?  styles.storeIconsActive : styles.storeIcons} 
                  />
                </TouchableOpacity>
              </View>
            </View>

      {/* this is a view of the Top part where have List of itens */}
          <View style={styles.viewTop}>
              <View >
                <List data={{showList, productName}}
                  refs={ListSheradRef}
                />           
              </View>
            </View>

      {/* this is a view of the Bottom part where have PhotoIcon - AllItens - CartIcon */}
            <View style={styles.viewBottom}>
            <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  style={styles.photo}
                  onPress={() => navigation.navigate('PhotoList')}
                >
                  <Image
                    source={PhotoIcon}
                    alt="photoicon"
                    style={{ width: 45, height: 45 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection:'column', alignItems:'center', marginBottom: 20, gap: 10}}>
                <Image
                  source={Dots3}
                  alt="3dots"
                  style={{ width: 50, height: 10 }}
                />
                <TouchableOpacity
                  style={showList === "*" ?  styles.allItensaActive : styles.allItens}  
                  onPress={() => {setShowList("*")}} 
                >
                  <Image
                    source={AllIcon}
                    alt="allitens"
                    style={{ width: 60, height: 60 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  style={styles.cart}
                  onPress={() => setModalVisibleAdd(true) }
                >
                  <Image
                    source={CartIcon}
                    alt="carticon"
                    style={{ width: 45, height: 45 }}
                  />
                </TouchableOpacity>
              </View>

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
    backgroundColor: "#ff8c00",
    flex: 0.8,
  },
  storeContainer:{
    flex:1,
    flexDirection:"row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  storeIcons: {
    width: 60, 
    height: 60,
  },
  storeIconsActive: {
    width: 60, 
    height: 60,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: "#fd7014",
  },
  
// view with PhotoIcon - AllItens - CartIcon  
  viewBottom: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photo: {
    backgroundColor: "#ff8c00",
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    padding: 15,
  },
  allItens: {
    borderWidth: 1, 
    borderColor: "lightgrey",
    borderRadius: 15, 
  },
  allItensaActive: {
    backgroundColor: "#ffffff",
    borderWidth: 3, 
    borderColor: "#fd7014",
    borderRadius: 8, 
  },
  cart: {
    backgroundColor: "#ff8c00",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    padding: 15,
  },
  
});
