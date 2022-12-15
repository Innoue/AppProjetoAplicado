import { StyleSheet,View,Text } from "react-native";


export const CardRecipe=({title, doTime,country,type})=>{
  return(
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{type}</Text>
      <Text style={styles.text}>{country}</Text>
      <Text style={styles.text}>{doTime}min</Text>
    </View>
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
