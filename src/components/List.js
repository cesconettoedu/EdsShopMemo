import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";

function List({data}) {
            // data = (showList, productName) props from Home.js, List component

  const [refreshing, setRefreshing] = React.useState(false);
  const [bringItems, setBringItems] = useState([]);
  const [place, setPlace] = useState();
 
  const fetchProduct = () => { 
    const all = [];
    if (data.showList === "*") {
      Items.bringAll()
      .then((items) => items.forEach((c) => all.push(c)))
      .then(setBringItems(all))  
    } else {
      Items.bring(data.showList)
      .then((items) => items.forEach((c) => all.push(c)))
      .then(setBringItems(all))
    }
  };

  

//delete
  const deleteItem = (id) => { 
    Items.remove(id)
      .then( onRefresh() )
      .catch( err => console.log(err) )
  }
  


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchProduct();
      setRefreshing(false);
    }, 1000);
  };


  
  useEffect(() => {
    fetchProduct();
    if(data.showList === '*'){
      setPlace('All Items') 
    } else if (data.showList === 'Any'){
      setPlace('Any Market') 
    } else {
      setPlace(data.showList)
    }
  }, [data]);


  return (
    <View style={styles.allContainer}>

      <Text style={styles.title}>{place}</Text>
      <FlatList
        data={bringItems}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => 
          <ProductField data={item} delet={() => deleteItem(item.id)} onRefresh={fetchProduct}/>
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
