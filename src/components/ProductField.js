import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, Image } from "react-native";
import ItemAddUpdate from "./ItemAddUpdate";

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
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => setModalSingleProd(true)}
        >
          <View style={styles.itemLeft}>
              
            <View style={ data.memoid === 'Costco'  ? [styles.place, styles.costcoColor] :  data.memoid === 'Dollarama'  ? [styles.place, styles.dollaramaColor] : data.memoid === 'Pharmacy'  ? [styles.place, styles.pharmacyColor] : [styles.place, styles.any]}>
              <Text>{data.memoid}</Text>
            </View>

            <Text style={styles.product} numberOfLines={1}>
            {data.product} 
            </Text>

            <TouchableOpacity
              onPress={delet}
              >
              <View style={styles.trash}>
                <Text>🗑️</Text>
              </View>
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
  item: {
    backgroundColor: "#f7f5f4",
    padding: 4,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 2,
    marginBottom: 5,
    height: 40,
  },
  itemLeft: {
    flexDirection: "row",  
    flexWrap: "wrap",
  },

  product: {
    //limit size of product description field
    fontSize: 18, 
    width: Platform.OS === "ios" ? 220 : 190,
  },

  trash: {
    justifyContent: "flex-end",
    width: 25,
    height: 25,
    left: Platform.OS === "ios" ? "180%" : "100%",
  },


  place: {
    width: 80,
    height: 24,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',  
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
