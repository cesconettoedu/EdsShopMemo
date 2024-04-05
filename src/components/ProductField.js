import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Items from "../services/sqlite/Items";

const ProductField = ({data}) => {


   //delete
  const deleteItem = (id) => { 
    Items.remove(id)
      .then( updated => console.log('product deleted') )
      .catch( err => console.log(err) )
  }
  
  
  useEffect(() => {
    
  }, [])

  return (
    <View style={styles.item}>
      <TouchableOpacity
      //</View>onPress={() => setModalVisible(true)}
      >
        <View style={styles.itemLeft}>
            
          <View style={ data.memoid === 'Costco'  ? styles.costcoColor :  data.memoid === 'Dollarama'  ? styles.dollaramaColor: styles.any}>
            <Text>{data.memoid}</Text>
          </View>

          <Text style={styles.product} numberOfLines={1}>
           {data.product} 
          </Text>

          <TouchableOpacity
            onPress={() => {deleteItem(data.id)}}
          >
            <View style={styles.trash}>
              <Text>🗑️</Text>
            </View>
          </TouchableOpacity>
        
        </View>
      </TouchableOpacity>
    </View>
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
    height: 35
  },
  itemLeft: {
    flexDirection: "row",  
    flexWrap: "wrap",
  },

  product: {
    //limit size of product description field
     
    width: Platform.OS === "ios" ? 220 : 190,
  },

  trash: {
    justifyContent: "flex-end",
    width: 20,
    height: 20,
    left: Platform.OS === "ios" ? "180%" : "100%",
  },

  costcoColor: {
    width: 80,
    height: 24,
    backgroundColor: "red",
    opacity: 0.4,
    borderRadius: 3,
    marginRight: 15,
    alignItems: "center",
  },
  dollaramaColor: {
    width: 80,
    height: 24,
    backgroundColor: "green",
    opacity: 0.4,
    borderRadius: 3,
    marginRight: 15,
    alignItems: "center",
  },
  any: {
    width: 80,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',   
  },
});

export default ProductField;
