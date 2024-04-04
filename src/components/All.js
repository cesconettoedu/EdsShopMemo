import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList} from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";


function All() {
  const [allItems, setAllItems] = useState();
  const [count, setCount] = useState();

  const allProduct = () => {   
    const all = [];
    
      Items.all()
      .then( 
        items => items.forEach( c => all.push(c) )
      )
      .then(
        setAllItems(all),
      )
  };

  
  useEffect(() => {
    allProduct();
    
  }, [])

  

  return (

    <View style={styles.allContainer} >
      <Text style={styles.title}> {count}  items to buy in total</Text>      
      <FlatList
        style={styles.flatList}
        data={allItems}
        renderItem={({ item }) => (
          <ProductField data={item}/> 
        )} 
      />
    </View>
  )
}

export default All

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    margin: 10,
    height: '95%',
  }, 
  title: {
    fontSize: 20,
    fontWeight:'600',
    textAlign: 'center',
    marginBottom: 10
  }, 

})