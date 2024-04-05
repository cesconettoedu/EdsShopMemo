import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function List(data) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [bringItems, setBringItems] = useState();
  


  const fetchProduct = () => { 
    const all = [];
    if (data.data === "*") {
      Items.bringAll()
      .then((items) => items.forEach((c) => all.push(c)))
      .then(setBringItems(all))
      .then();
    } else {
      
      Items.bring(data.data)
      .then((items) => items.forEach((c) => all.push(c)))
      .then(setBringItems(all))
      .then();
    }
  };

  


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchProduct();
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchProduct();
  }, [data]);

  return (
    <View style={styles.allContainer}>
      <Text style={styles.title}> X items to buy in total</Text>
      <FlatList
        style={styles.flatList}
        data={bringItems}
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

export default List;

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
