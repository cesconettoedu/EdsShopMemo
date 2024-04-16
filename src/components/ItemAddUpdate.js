import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, TextInput, Modal } from "react-native";

import Items from "../services/sqlite/Items";
import Btn from "../components/Btn";

import AnyIcon from "../../assets/icons/any3.png";
import CostcoIcon from "../../assets/icons/costco3.png";
import DollaramaIcon from "../../assets/icons/dollarama3.png";
import PharmacyIcon from "../../assets/icons/pharmacy.png";
import Ok from "../../assets/joia1.png";

function ItemAddUpdate({ modalVisibleAdd, modalUpdateProd, prodData, modalSingleProd }) {


  const [productName, setProductName] = useState(null);
  const [selectedIdMemo, setSelectedIdMemo] = useState("Any");
  const [modalVisibleB, setModalVisibleB] = useState(false);
  
  
////////////// to save a new item  /////////////////////
  const handleAddProd = () => {
    setProductName(null);
    setSelectedIdMemo("Any");
    handleAddProduct();
  };

  const handleAddProduct = () => {
    if (productName === null) {
      alert("Please type a name");
    } else {
      Items.create({ product: productName, memoid: selectedIdMemo })
        .then(created)
        .catch((err) => console.log(err));
    }
  };
          ////////////// to show the modal OK after save a item  /////////////////////
          const created = () => {
            setModalVisibleB(true);
            setTimeout(() => {
              setModalVisibleB(false);
              modalVisibleAdd(false);
            }, 1000);
          };



////////////// to update a item  /////////////////////
  const handleUpdateProduct = () => {
    if (productName === null) {
      alert("Please type a name");
    } else {
      Items.update( prodData.id, {product: productName, memoid: selectedIdMemo} )
        .then(console.log('update'))
        .then(updated)
        .catch((err) => console.log(err));
    }
  };
          ////////////// to show the modal OK after update a item  /////////////////////
          const updated = () => {
            setModalVisibleB(true);
            setTimeout(() => {
              setModalVisibleB(false);
              modalSingleProd(false);
              modalUpdateProd(false);
            }, 1000);
          };



  useEffect(() => {
    if(prodData){
      setProductName(prodData.product);
      setSelectedIdMemo(prodData.memoid);
    }
  }, [])
  

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
            What do you need buy?
          </Text>
          <TextInput
            style={styles.input}
            placeholder={" What do you need buy?"}
            autoCapitalize="sentences"
            maxLength={70}
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
            Where ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedIdMemo("Any");
              }}
            >
              <Image
                source={AnyIcon}
                alt="anymarket"
                style={ selectedIdMemo === "Any" ? styles.addStoreIcons : styles.addStoreIconsDesactived }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedIdMemo("Costco");
              }}
            >
              <Image
                source={CostcoIcon}
                alt="costco"
                style={ selectedIdMemo === "Costco" ? styles.addStoreIcons : styles.addStoreIconsDesactived }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedIdMemo("Dollarama");
              }}
            >
              <Image
                source={DollaramaIcon}
                alt="dollarama"
                style={ selectedIdMemo === "Dollarama" ? styles.addStoreIcons : styles.addStoreIconsDesactived }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedIdMemo("Pharmacy");
              }}
            >
              <Image
                source={PharmacyIcon}
                alt="pharmacy"
                style={ selectedIdMemo === "Pharmacy" ? styles.addStoreIcons : styles.addStoreIconsDesactived }
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
              gap: 40,
              marginTop: 50,
            }}
          >
                      
            {prodData && 
            <>
              <Btn 
                title={"Close"} 
                onPress={() => { 
                    modalUpdateProd(false)
                    modalSingleProd(false)                             
                }}
              />
              <Btn
                title={"Update"}
                onPress={() => { handleUpdateProduct() }}
              />
            </>
            }
            {!prodData && 
            <>
              <Btn 
                title={"Close"} 
                onPress={() => { 
                   modalVisibleAdd(false)                           
                }}
              />
              <Btn
                title={"Add"}
                onPress={() => { handleAddProd() }}
                />
            </>
            }

          </View>
        </View>
      </View>

      {/*--------- Modal ----------------- to show OK after save a item */}
      <Modal animationType="fade" transparent={true} visible={modalVisibleB}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
            >
              Item {prodData && 'Updated'}{!prodData && 'Added'} 
            </Text>
            <Image source={Ok} alt="joia" style={{ width: 100, height: 100 }} />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default ItemAddUpdate;

const styles = StyleSheet.create({
  // Modal Cart Add
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: 400,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(58, 55, 49, 0.95)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 280,
    height: 50,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  addStoreIconsDesactived: {
    width: 60,
    height: 60,
    opacity: 0.3,
  },
  addStoreIcons: {
    width: 80,
    height: 80,
  },
});
