import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function Any() {
  const [anyItems, setAnyItems] = useState();

 
 
 
  const anyProduct = () => {
    const any = [];

    Items.single('Any')
      .then((items) => items.forEach((c) => any.push(c)))
      .then(setAnyItems(any))
      .then();
  };


  useEffect(() => {
    anyProduct();
  }, []);

  return (
    <View style={styles.allContainer}>
      <Text style={styles.title}>  items to buy in total</Text>
      <FlatList
       
        data={anyItems}
        renderItem={({ item }) => 
          <ProductField data={item} />
        }
      />
    </View>
  );
}

export default Any;

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
