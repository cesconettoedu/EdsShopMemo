import React, { useState, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, TextInput, Pressable } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import Items from "../services/sqlite/Items";

import All from "../components/All";
import Any from "../components/Any";
import Costco from "../components/Costco";
import Dollarama from "../components/Dollarama";
import Pharmacy from "../components/Pharmacy";

import CartIcon from "../../assets/icons/cart4.png";
import PhotoIcon from "../../assets/icons/photoIcon3.png";
import AllIcon from "../../assets/icons/all.png";
import AnyIcon from "../../assets/icons/any3.png";
import CostcoIcon from "../../assets/icons/costco3.png";
import DollaramaIcon from "../../assets/icons/dollarama3.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";

export default function Home() {

  const [showAll, setShowAll] = useState(true);
  const [showAny, setShowAny] = useState(false);
  const [showDollarama, setShowDollarama] = useState(false);
  const [showCostco, setShowCostco] = useState(false);
  const [showPharmacy, setShowPharmacy] = useState(false);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [productName, setProductName] = useState("");
  const [selectedIdMemo, setSelectedIdMemo] = useState("Any");


  const radioButtons = useMemo(
    () => [
      {
        id: "Any",
        label: "Any",
        value: "Any Market",
      },
      {
        id: "Dollarama",
        label: "Dollarama",
        value: "Dollarama",
      },
      {
        id: "Costco",
        label: "Costco",
        value: "Costco",
      },
    ],
    []
  );

  //------------------------------just to see the whole DB
  // const printItems = (item) => {
  //   console.log(`id:${item.id}, product:${item.product}, model:${item.memoid}`)
  // }

  const handleAddProduct = () => {
    Items.create( {product:productName, memoid:selectedIdMemo} )
      .then( console.log('Item created'))
      .catch( err => console.log(err) )    
      
  // showAllProduct();
  };

  // const showAllProduct = () => {   
  //   Items.all()
  //     .then( 
  //       items => items.forEach( c => printItems(c) )
  //     )
  // };





  return (
    <View style={styles.container}>
     
    
 {/* this is a view of the HEADER free place to put something */}   
    <View style={styles.viewTopPlus}>
      <Text> free space, still work on </Text>
    </View>

{/* this is a view of the Middle part where have Store Icons to show the product */}
      <View style={styles.viewMiddle}>
       
        <View style={styles.storeContainer} >
          
          <TouchableOpacity
            onPress={() => {setShowAll(false); setShowAny(true); setShowDollarama(false); setShowCostco(false); setShowPharmacy(false)}}            
            >
            <Image
              source={AnyIcon}
              alt="anymarket"
              style={styles.storeIcons} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {setShowAll(false); setShowAny(false); setShowDollarama(false); setShowCostco(true); setShowPharmacy(false)}}  
            >
            <Image
              source={CostcoIcon}
              alt="costco"
              style={styles.storeIcons} 
            />
          </TouchableOpacity>

          <TouchableOpacity
             onPress={() => {setShowAll(false); setShowAny(false); setShowDollarama(true); setShowCostco(false); setShowPharmacy(false)}}
             >
            <Image
              source={DollaramaIcon}
              alt="dollarama"
              style={styles.storeIcons} 
            />
          </TouchableOpacity>

            <TouchableOpacity
             onPress={() => {setShowAll(false); setShowAny(false); setShowDollarama(false); setShowCostco(false); setShowPharmacy(true)}}
             >
            <Image
              source={PharmacyIcon}
              alt="pharmacy"
              style={styles.storeIcons} 
            />
          </TouchableOpacity>


        </View>

      </View>





{/* this is a view of the Top part where have List of itens */}
     <View style={styles.viewTop}>
        <View >
          {showAll && <All />}
          {showAny && <Any/>}
          {showCostco && <Costco/>}  
          {showDollarama && <Dollarama/>}
          {showPharmacy && <Pharmacy/>}
           
        </View>
      </View>










{/* this is a view of the Bottom part where have PhotoIcon - AllItens - CartIcon */}
      <View style={styles.viewBottom}>
       


       <View style={{ flex: 0.3 }}>
          <TouchableOpacity
            style={styles.photo}
            //onPress={() =>     }
          >
            <Image
              source={PhotoIcon}
              alt="photoicon"
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        </View>
      

        <View >
          <TouchableOpacity
            style={styles.allItens} 
            onPress={() => {setShowAll(true); setShowAny(false); setShowDollarama(false); setShowCostco(false); setShowPharmacy(false)}}
             
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
      
        {/*--------- Modal ----------------- to open a text input */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleAdd}
            onRequestClose={() => {
              setModalVisibleAdd(!modalVisibleAdd);
            }}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>             
          
                <TextInput 
                  style={styles.input} 
                  placeholder={" What do you need buy?"} 
                  autoCapitalize='sentences'
                  maxLength={70}
                  value={productName}
                  onChangeText={text => setProductName(text)} 
                />

                <View style={styles.radioAdd}>
                  <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={setSelectedIdMemo}
                    selectedId={selectedIdMemo}
                    layout='row'
                  />       
                </View>
                       
                <View style={styles.addClosCont}>
                  <Pressable
                    style={[styles.button ]}
                    onPress={() => {
                      setModalVisibleAdd(!modalVisibleAdd); 
                      handleAddProduct()
                    }}
                  >
                    <Text style={styles.textStyle}>Add in Cart</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.closeModal]}
                    onPress={() => setModalVisibleAdd(!modalVisibleAdd)}
                  >
                    <Text>X</Text>
                  </Pressable>
                </View>
              </View>
            </View>

          </Modal>   




      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  
  viewTopPlus:{
    backgroundColor: "#ff8c00",
    flex: 1, 
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
    height: 60
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
    borderWidth: 2, 
    borderColor: "#F6792B",
    borderRadius: 5, 
  },
  cart: {
    backgroundColor: "#ff8c00",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    padding: 15,
  },

  // Modal Cart Add
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 400,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(58, 55, 49, 0.95)'
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
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
  input:{
    width: 280,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10
  },
  radioAdd: {
    marginBottom: 50
  },
  addClosCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#F6792B",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    left: 25,

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  closeModal:{
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    left: 80,
    top: 30,
    height: 30,
    paddingTop: 3,
  },
});
