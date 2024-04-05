import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function Dollarama() {
  const [dollaramaItems, setDollaramaItems] = useState();

 
 
 
  const dollaramaProduct = () => {
    const dollarama = [];

    Items.single('Dollarama')
      .then((items) => items.forEach((c) => dollarama.push(c)))
      .then(setDollaramaItems(dollarama))
      .then();
  };


  useEffect(() => {
    dollaramaProduct();
  }, []);

  return (
    <View style={styles.allContainer}>
      <Text style={styles.title}>  items to buy in total</Text>
      <FlatList
       
        data={dollaramaItems}
        renderItem={({ item }) => 
          <ProductField data={item} />
        }
      />
    </View>
  );
}

export default Dollarama;

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
