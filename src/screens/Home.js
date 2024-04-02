import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import CartIcon from "../../assets/icons/cart4.png";
import PhotoIcon from "../../assets/icons/photoIcon3.png";
import AllIcon from "../../assets/icons/all.png";
import AnyIcon from "../../assets/icons/any3.png";
import CostcoIcon from "../../assets/icons/costco3.png";
import DollaramaIcon from "../../assets/icons/dollarama3.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";

export default function Home() {

  return (
    <View style={styles.container}>
     

{/* this is a view of the Top part where have List of itens */}
     <View style={styles.viewTop}>
        <Text>view1</Text>
      </View>



{/* this is a view of the Middle part where have Store Icons to show the product */}
      <View style={styles.viewMiddle}>
       
        <View style={styles.storeContainer} >
          
          <TouchableOpacity
            style={styles.storeIcons} 
            //onPress={() => setModalVisible(true)}
             
          >
            <Image
              source={AnyIcon}
              alt="anymarket"
              style={{ width: 70 , height: 70 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.storeIcons} 
            //onPress={() => setModalVisible(true)}
             
          >
            <Image
              source={CostcoIcon}
              alt="costco"
              style={{ width: 70 , height: 70 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.storeIcons} 
            //onPress={() => setModalVisible(true)}
             
          >
            <Image
              source={DollaramaIcon}
              alt="dollarama"
              style={{ width: 70 , height: 70 }}
            />
          </TouchableOpacity>

            <TouchableOpacity
            style={styles.storeIcons} 
            //onPress={() => setModalVisible(true)}
             
          >
            <Image
              source={PharmacyIcon}
              alt="pharmacy"
              style={{ width: 70 , height: 70 }}
            />
          </TouchableOpacity>


        </View>

      </View>









{/* this is a view of the Bottom part where have PhotoIcon - AllItens - CartIcon */}
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
              source={AllIcon}
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
   
    flex: 5,
  },


// view with Store Icons  
  viewMiddle: {
    backgroundColor: "#ff8c00",
    flex: 1.2,
  },

  storeContainer:{
    flex:1,
    flexDirection:"row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    
  },
  
// view with PhotoIcon - AllItens - CartIcon  
  viewBottom: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photo: {
    backgroundColor: "#ff8c00",
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    padding: 15,
  },
  allItens: {
    borderWidth: 3, 
    borderColor: "#F6792B",
    borderRadius: 5, 
  },
  cart: {
    backgroundColor: "#ff8c00",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    padding: 15,
  },

});
