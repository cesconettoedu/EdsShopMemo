import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function All() {
  const [allItems, setAllItems] = useState();
  const [count, setCount] = useState();

  const [refreshing, setRefreshing] = React.useState(false);

  const allProduct = () => {
    const all = [];

    Items.all()
      .then((items) => items.forEach((c) => all.push(c)))
      .then(setAllItems(all))
      .then();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      allProduct();
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    allProduct();
  }, []);

  return (
    <View style={styles.allContainer}>
      <Text style={styles.title}> {count} items to buy in total</Text>
      <FlatList
        style={styles.flatList}
        data={allItems}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => 
          <ProductField data={item} />
        }
      />
    </View>
  );
}

export default All;

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
