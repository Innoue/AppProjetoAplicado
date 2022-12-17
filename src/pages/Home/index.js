import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CardRecipe } from '../../components/CardRecipe';
import { useNavigation,useFocusEffect } from '@react-navigation/native'
import { FAB } from 'react-native-paper';
import api from '../../services/api';

export default function Home(){
  const [data, setData] = useState({})
  const navigation = useNavigation();
  function navigate(){
    navigation.navigate('RecipeEdit')
  }

  useFocusEffect(()=>{
    search()
  },)

  async function search(){
    try {
      const response = await api.get('/recipe')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.containerCard}>
      <CardRecipe 
        id={item.id}
        item={item}
      />
    </View>
  )
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        size='medium'
        color='#F0F0F0'
        onPress={navigate}
      />
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
  },
  fab: {
    position: 'absolute',
    margin: 36,
    right: 0,
    bottom: 0,
    backgroundColor:'#1824B0'
  },
})

const DATA = [
  {
    id:1,
    title:'Brusqueta',
    type:'Lanche',
    country:'Itália',
    doTime:15
  },
  {
    id:2,
    title:'Carbonara',
    type:'Refeição',
    country:'Itália',
    doTime:15
  },
  {
    id:3,
    title:'Sushi',
    type:'Refeição',
    country:'Japão',
    doTime:120
  },
  {
    id:4,
    title:'Pudim',
    type:'Sobremesa',
    country:'Brasil',
    doTime:50
  },
]
