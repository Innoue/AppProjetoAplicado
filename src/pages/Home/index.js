import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CardRecipe } from '../../components/CardRecipe';

export default function Home(){
  const renderItem = ({ item }) => (
    <View style={styles.containerCard}>
      <CardRecipe title={item.title} type={item.type} country={item.country} doTime={item.doTime}/>
    </View>
  )
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  containerCard:{
    height:150,
    width:'100%',
    marginBottom:'5%'
  },
  scroll:{
    width:'100%',
    paddingHorizontal:20
  }
})

const DATA = [
  {
    id:1,
    title:'Pudim',
    type:'Sobremesa',
    country:'Brasil',
    doTime:50
  },
  {
    id:2,
    title:'Pudim',
    type:'Sobremesa',
    country:'Brasil',
    doTime:50
  },
  {
    id:3,
    title:'Pudim',
    type:'Sobremesa',
    country:'Brasil',
    doTime:50
  },
  {
    id:4,
    title:'Pudim',
    type:'Sobremesa',
    country:'Brasil',
    doTime:50
  },
]
