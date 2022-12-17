import { StyleSheet,View,Text,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'

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
  }
});
