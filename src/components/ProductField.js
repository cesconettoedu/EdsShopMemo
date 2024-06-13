import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, Image } from "react-native";
import ItemAddUpdate from "./ItemAddUpdate";
import Ionicons from '@expo/vector-icons/Ionicons';
import Update from "../../assets/icons/update.png";

const ProductField = ({data, delet, onRefresh}) => {

  const [modalSingleProd, setModalSingleProd] = useState(false);
  const [modalUpdateProd, setModalUpdateProd] = useState(false);

  const updateItem = () => { 
    setModalSingleProd(false); 
    onRefresh();
  } 


  return (
    <>
      <View >
        <TouchableOpacity
          onPress={() => setModalSingleProd(true)}
          style={styles.item}
        >
        <Text style={ data.memoid === 'Costco'  ? [styles.place, styles.costcoColor] :  
                          data.memoid === 'Dollarama'  ? [styles.place, styles.dollaramaColor] : 
                          data.memoid === 'Pharmacy'  ? [styles.place, styles.pharmacyColor] : 
                          data.memoid === 'Party'  ? [styles.place, styles.partyColor] :
                          [styles.place, styles.any]} >{data.memoid}</Text>
        <Text style={styles.itemText} numberOfLines={1}>{data.product}</Text>
        <View style={styles.actionIcons}>
          {data.urilink && <Ionicons name="images" size={24} color="#363535" style={styles.icon} />}
          {!data.urilink && <Ionicons name="images" size={24} color="#dfdbd8" style={styles.icon} />}
          <TouchableOpacity
                onPress={delet}   
                style={styles.icon}             
              >
            <Ionicons name="trash" size={24} color="#EA2615" />
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </View>


    {/* -------------Modal to open a single product field -------------- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSingleProd}
        onRequestClose={() => {
          setModalSingleProd(!modalSingleProd);
      }}>
        <TouchableOpacity 
          style={{flex:1}}
          onPress={() => {
            setModalSingleProd(!modalSingleProd);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}> 
              <View style={ data.memoid === 'Costco'  ? [styles.placeModal, styles.costcoColor] :  
                            data.memoid === 'Dollarama'  ? [styles.placeModal, styles.dollaramaColor] : 
                            data.memoid === 'Pharmacy'  ? [styles.placeModal, styles.pharmacyColor] : 
                            data.memoid === 'Party'  ? [styles.placeModal, styles.partyColor] :
                            [styles.placeModal, styles.any]}
              >
                <Text style={{marginBottom: 10, fontSize: 15, color:'white', fontWeight:'bold'}}>{data.memoid}</Text>
              </View> 
              <Text style={{fontSize: 25}}>
                {data.product}
              </Text> 
              <Image
                  src={data.urilink}
                  alt="product"
                  resizeMode="contain"
                  style={{width: 100, height: 100}} 
                />
              <TouchableOpacity
                onPress={() => setModalUpdateProd(true)}        
                style={{marginTop: 30}}
                >
                <Image
                  source={Update}
                  alt="update"
                  style={{width: 50, height: 50}} 
                />
              </TouchableOpacity>      
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    {/* -------------Modal to open a UPDATE product component ItemAddUpdate.js -------------- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalUpdateProd}
        onRequestClose={() => {
          setModalUpdateProd(false);
      }}>
        <ItemAddUpdate
           modalUpdateProd={setModalUpdateProd}
           modalSingleProd={setModalSingleProd}
           prodData={data}
           updateItem={() => updateItem()}
        />

      </Modal>
    
    
    </>
  );
};

const styles = StyleSheet.create({
  // item: {
  //   backgroundColor: "#f7f5f4",
  //   padding: 4,
  //   borderRadius: 3,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   margin: 2,
  //   marginBottom: 5,
  //   height: 40,
  // },
  // itemLeft: {
  //   flexDirection: "row",  
  //   flexWrap: "wrap",
  // },

  // product: {
  //   //limit size of product description field
  //   fontSize: 18, 
  //   width: Platform.OS === "ios" ? 220 : 170,
  // },

  // iconsPhoTra:{
  //   flexDirection: 'row', 
    
  // },
  // photo:{
  //   left: Platform.OS === "ios" ? "180%" : "60%",
  // },
  // trash: {
  //   flexDirection: 'row', 
  //   justifyContent: "flex-end",
  //   width: 25,
  //   height: 25,
  //   left: Platform.OS === "ios" ? "180%" : "80%",
  // },
  // place: {
  //   width: '80%',
  //   height: 24,
  //   opacity: 0.4,
  //   borderRadius: 5,
  //   marginRight: 15,
  //   paddingTop: 2,
  //   alignItems: 'center',  
  // },

item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(247,255,244,0.05)',
    width:' 95%',
    marginLeft: '2%',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    width: '53%',
  },
  actionIcons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    
    width: '25%',
  },

  place: {
    width: '23%',
    marginRight: 5,
    padding:2,
    borderRadius: 3,
    opacity: 0.6,
    textAlign: 'center',
  },
  any: {
    backgroundColor: 'gray',
  },
  costcoColor: {
    backgroundColor: "#55BCF6",
  },
  dollaramaColor: {
    backgroundColor: "green",
  },
  pharmacyColor: {
    backgroundColor: 'red',   
  },
  partyColor: {
    backgroundColor: '#FDDA0D',   
  },

  //modal
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
  placeModal: {
    borderRadius: 5,
    margin: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    marginBottom: 30,
  },
});

export default ProductField;
