import { StyleSheet, Text, View, FlatList} from "react-native";
import Task from "./Task";

//import Task from './Task';

function All() {


  return (

    <View style={styles.allContainer} >
      <Text style={styles.title}> 19  items to buy in total</Text>
      
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
            
     

      
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
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    margin: 10,
    height: '95%',
  }, 
  title: {
    fontSize: 20,
    fontWeight:'600',
    textAlign: 'center',
    marginBottom: 10
  }, 

})