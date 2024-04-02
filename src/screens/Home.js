import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import CartIcon from "../../assets/icons/cart4.png";
import PhotoIcon from "../../assets/icons/photoIcon3.png";
import AllItens from "../../assets/icons/all.png";

export default function Home() {

  return (
    <View style={styles.container}>
     
     <View style={styles.viewTop}>
        <Text>view1</Text>
      </View>

      <View style={styles.viewMiddle}>
        <Text>view2</Text>
      </View>






      <View style={styles.viewBottom}>
       


       <View style={{ flex: 0.3 }}>
          <TouchableOpacity
            style={styles.photo}
            //onPress={() => setModalVisible(true)}
          >
            <Image
              source={PhotoIcon}
              alt="photoicon"
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        </View>
      

        <View >
          <TouchableOpacity
            style={styles.allItens} 
            //onPress={() => setModalVisible(true)}
             
          >
            <Image
              source={AllItens}
              alt="allitens"
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
        </View>

       
        <View style={{ flex: 0.3 }}>
          <TouchableOpacity
            style={styles.cart}
            //onPress={() => setModalVisible(true)}
          >
            <Image
              source={CartIcon}
              alt="carticon"
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        </View>
      





      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewTop: {
    backgroundColor: "red",
    flex: 5,
  },
  viewMiddle: {
    backgroundColor: "darkorange",
    flex: 1.5,
  },
  
  
  
// view with PhotoIcon - AllItens - CartIcon  
  viewBottom: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cart: {
    backgroundColor: "#F6792B",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    padding: 15,
  },

  photo: {
    backgroundColor: "#F6792B",
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    padding: 15,
  },
  
  allItens: {
    borderWidth: 3, 
    borderColor: "#F6792B",
    borderRadius: 5, 
  },

});
