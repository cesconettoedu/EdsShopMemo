import React, { useEffect, useState, useImperativeHandle } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Share } from "react-native";
import ProductField from "./ProductField";
import Items from "../services/sqlite/Items";


function List({data, refs}) {
            // data = (showList, productName, triggerFunctionInList) props from Home.js, List component
    


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
    }; 
    
  }, [data]);



 
  // Expose the function using useImperativeHandle - usei porque nao tinha aonde chamar a funcao.
  useImperativeHandle(refs, () => ({
    triggerShareFunction: shareList
  }));

 const shareList = () => {
    const listContent = bringItems.map(item => item.product).join('\n  - ');   
    Share.share({
      message: place+':'+('\n')+'  - '+listContent,
      title: place,
    });
  };


  return (
    <View style={styles.allContainer}>
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
