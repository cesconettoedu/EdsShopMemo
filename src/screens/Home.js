import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, TextInput} from "react-native";

import Items from "../services/sqlite/Items";
import List from "../components/List";
import Btn from "../components/Btn";

import CartIcon from "../../assets/icons/cart4.png";
import PhotoIcon from "../../assets/icons/photoIcon3.png";
import AllIcon from "../../assets/icons/all.png";
import AnyIcon from "../../assets/icons/any3.png";
import CostcoIcon from "../../assets/icons/costco3.png";
import DollaramaIcon from "../../assets/icons/dollarama3.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";
import Ok from "../../assets/joia1.png";

export default function Home({navigation}) {


  const [showList, setShowList] = useState("*");

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [productName, setProductName] = useState(null);
  const [selectedIdMemo, setSelectedIdMemo] = useState("Any");
  const [modalVisibleB, setModalVisibleB] = useState(false);

  const handleAddProd = () => {
    setProductName(null);
    setSelectedIdMemo("Any");
    handleAddProduct();
  }

  const handleAddProduct = () => {
    if (productName === null) {
      alert('Please type a name');

    } else {

    Items.create( {product:productName, memoid:selectedIdMemo} )
      .then( setModalVisibleAdd(!modalVisibleAdd))
      .then( created )
      .catch( err => console.log(err) )
    }    
  };


  ////////////// to show the modal OK after save a item  /////////////////////
  const created = () => {
    setModalVisibleB(true)
    setTimeout(() => {
      setModalVisibleB(false)
    }, 1000);
  };


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
          <List data={{showList, productName}}/>           
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

        <View >
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
                <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>What do you need buy?</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder={" What do you need buy?"} 
                  autoCapitalize='sentences'
                  maxLength={70}
                  value={productName}
                  onChangeText={text => setProductName(text)} 
                />
                <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>Where ?</Text>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                  <TouchableOpacity
                   onPress={() => {setSelectedIdMemo("Any")}}            
                  >
                    <Image
                      source={AnyIcon}
                      alt="anymarket"
                      style={selectedIdMemo === "Any" ?  styles.addStoreIcons : styles.addStoreIconsDesactived} 
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                   onPress={() => {setSelectedIdMemo("Costco")}}  
                  >
                    <Image
                      source={CostcoIcon}
                      alt="costco"
                      style={selectedIdMemo === "Costco" ?  styles.addStoreIcons : styles.addStoreIconsDesactived}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                   onPress={() => {setSelectedIdMemo("Dollarama")}}
                  >
                    <Image
                      source={DollaramaIcon}
                      alt="dollarama"
                      style={selectedIdMemo === "Dollarama" ?  styles.addStoreIcons : styles.addStoreIconsDesactived} 
                    />
                  </TouchableOpacity>

                    <TouchableOpacity
                   onPress={() => {setSelectedIdMemo("Pharmacy")}}
                  >
                    <Image
                      source={PharmacyIcon}
                      alt="pharmacy"
                      style={selectedIdMemo === "Pharmacy" ?  styles.addStoreIcons : styles.addStoreIconsDesactived} 
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', gap: 40, marginTop: 50}}>
                  <Btn 
                    title={'Close'}
                    onPress={() => setModalVisibleAdd(!modalVisibleAdd)}
                  />
                  <Btn 
                    title={'Add'}
                    onPress={() => {
                        handleAddProd()
                      }}
                  />   
                </View>
              </View>
            </View>
          </Modal> 


        {/*--------- Modal ----------------- to show OK after save a item */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibleB}
            onRequestClose={() => {
              setModalVisibleB(!modalVisibleB);
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>   
                  <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>Item Added</Text>
                  <Image
                    source={Ok}
                    alt="joia"
                    style={{width: 100, height: 100}}
                  />      
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
    borderRadius: 5, 
  },
  allItensaActive: {
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
  addStoreIconsDesactived: {
    width: 60, 
    height: 60,
    opacity: 0.3
  },
  addStoreIcons:{
    width: 80, 
    height: 80,
  },
});
