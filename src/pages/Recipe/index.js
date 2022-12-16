import React, { useLayoutEffect } from 'react'
import { View, Text, Button, StyleSheet,ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function Recipe(){
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Pudim',
      headerTitleAlign: 'center',
      headerTitleStyle: { 
        fontSize:24,
        color: '#C16714',
        fontWeight:'bold',
      }
    })
  }, [navigation])
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={{alignItems:'flex-start'}}>
          <Text style={styles.time}>Tempo de preparo: 50min</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:10}}>
          <Text style={{...styles.title,alignText:'left'}}>Ingredientes</Text>
          <Text style={styles.textRecipe}>1 Leite MOÇA® (lata ou caixinha) 395 g</Text>
          <Text style={styles.textRecipe}>2 medidas (da lata) de Leite Líquido NINHO® Forti+ Integral (790 ml)</Text>
          <Text style={styles.textRecipe}>3 ovos</Text>          
        </View>
        <View style={{alignItems:'flex-start',marginTop:10}}>
          <Text style={{...styles.title,alignText:'left'}}>Modo de preparo</Text>
          <Text>
            almdajchjshbsadnasodnaosidnias
            almdajchjshbsadnasodnaosidnias
            almdajchjshbsadnasodnaosidnias
            almdajchjshbsadnasodnaosidnias
            asojndaousdnaosidnaaaaaaaaaaaaaaaaaaaaaoa
          </Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
          <Text style={styles.title}>Nacionalidade: </Text>
          <Text style={styles.title}>Brasil</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
          <Text style={styles.title}>Tipo de refeição: </Text>
          <Text style={styles.title}>Café da manhã</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
          <Text style={styles.title}>TAGs </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Forno</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Fácil</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:10,
  },
  title:{
    fontSize: 24,
    fontWeight:'bold',
    color:'#C16714',
    // fontFamily:'Inter'
  },
  time:{
    fontSize:12,
    fontStyle:'italic',
    // fontFamily:'inter'
  },
  textRecipe:{
    fontSize:15,
    // fontFamily:'inter',

  },
  tag:{
    backgroundColor:'orange',
    borderRadius:10,
    paddingHorizontal:7,
    marginHorizontal:5,
  },
  tagText:{
    fontSize:15,
  },
  scroll:{
    width:'100%',
    paddingHorizontal:20
  }

})

