import { StyleSheet,View,Text,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { FlatList } from "react-native-gesture-handler";

export const CardRecipe=({item})=>{
  const navigation = useNavigation();

  function navigate(){
    navigation.navigate('Recipe',{item})
  }
  return(
    <TouchableOpacity onPress={navigate} style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.type}</Text>
      <Text style={styles.text}>{item.country}</Text>
      <Text style={styles.text}>{item.doTime}min</Text>
      <View style={styles.containerTag}>
        <FlatList
          data={item.tags}
          renderItem={({item}) => (
            <Text style={styles.tagText}>
              #{item}
            </Text>
          )}
          numColumns={6}
          contentContainerStyle={{flexGrow:1,alignItems:'flex-start'}}
          keyExtractor={(item, index) => item.tag}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    justifyContent:'center',
    borderRadius:20,
    padding:20
  },
  title:{
    fontSize:24,
    fontWeight:'bold'
  },
  text:{
    marginTop:5,
    fontSize:14
  },
  containerTag:{
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  tagText:{
    fontSize:15,
    marginTop:5,
    color:'#1824B0',
    textAlign:'left',
    marginRight:10
  },
});
