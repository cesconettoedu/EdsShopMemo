import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList, Animated} from "react-native";
import TutorialItem from "./TutorialItem";
import Btn from "./Btn"


export default function Tutorial(props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems}) => {
      setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

 
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>

     
      <FlatList
        data={props.props.whichTutorial} 
        renderItem={({ item }) => <TutorialItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}  
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      </View>
      <View style={{alignItems:'center'}}>

      <Btn
        title='Close'
        onPress={props.props.close}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
}); 
