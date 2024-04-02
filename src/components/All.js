import { StyleSheet, Text, View, FlatList} from "react-native";

//import Task from './Task';

function All() {


  return (

    <View style={styles.allContainer} >
      <Text >All Only</Text>
      
      {/* <FlatList
        style={styles.flatList}
        data={allList}
        renderItem={({ item }) => (
          <Task data={item}/> 
        )} 
      />  */}
    </View>
  )
}

export default All

const styles = StyleSheet.create({
  allContainer: {
    height: '100%',
    backgroundColor: 'green'
  },  

})