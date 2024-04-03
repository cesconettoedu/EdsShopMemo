import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";


const Task = () => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
      //</View>onPress={() => setModalVisible(true)}
      >
        <View style={styles.itemLeft}>
          <View style={styles.costcoColor}>
            <Text>Costco</Text>
          </View>

          <Text style={styles.product} numberOfLines={1}>
            papel higienico
          </Text>

          <TouchableOpacity
          //onPress={() => {deleteItem(data.id)}}
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
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 2,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
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
    borderRadius: 5,
    marginRight: 15,
    alignItems: "center",
  },
  dollaramaColor: {
    width: 80,
    height: 24,
    backgroundColor: "green",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    alignItems: "center",
  },
});

export default Task;
