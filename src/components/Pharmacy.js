import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function Pharmacy() {
  const [pharmacyItems, setPharmacyItems] = useState();

 
 
 
  const pharmacyProduct = () => {
    const pharmacy = [];

    Items.single('Pharmacy')
      .then((items) => items.forEach((c) => pharmacy.push(c)))
      .then(setPharmacyItems(pharmacy))
      .then();
  };


  useEffect(() => {
    pharmacyProduct();
  }, []);

  return (
    <View style={styles.allContainer}>
      <Text style={styles.title}>  items to buy in total</Text>
      <FlatList
       
        data={pharmacyItems}
        renderItem={({ item }) => 
          <ProductField data={item} />
        }
      />
    </View>
  );
}

export default Pharmacy;

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
