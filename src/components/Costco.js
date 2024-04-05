import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function Costco() {
  const [costcoItems, setCostcoItems] = useState();

 
 
 
  const costcoProduct = () => {
    const costco = [];

    Items.single('Costco')
      .then((items) => items.forEach((c) => costco.push(c)))
      .then(setCostcoItems(costco))
      .then();
  };


  useEffect(() => {
    costcoProduct();
  }, []);

  return (
    <View style={styles.allContainer}>
      <Text style={styles.title}>  items to buy in total</Text>
      <FlatList
       
        data={costcoItems}
        renderItem={({ item }) => 
          <ProductField data={item} />
        }
      />
    </View>
  );
}

export default Costco;

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#EEEEEE",
    borderRadius: 3,
    margin: 10,
    height: "95%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
});
