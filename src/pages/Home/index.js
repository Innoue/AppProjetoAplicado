import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { View, StyleSheet, TouchableOpacity,Text,FlatList, ScrollView, TextInput } from 'react-native'
import { CardRecipe } from '../../components/CardRecipe';
import { useNavigation, useIsFocused  } from '@react-navigation/native'
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';

export default function Home(){
  const [data, setData] = useState([])
  const [recipeSearch,setRecipeSearch] = useState('')
  const navigation = useNavigation()
  const isFocused  = useIsFocused()

  useEffect(()=>{
    if(isFocused)
      search()
  },[isFocused])

  const dataSearch = useMemo(()=>{
    return data.filter((item)=>{
      const hasTitle = new RegExp(recipeSearch,'i').test(item.title)
      const hasType = new RegExp(recipeSearch,'i').test(item.type)
      const hasCountry = new RegExp(recipeSearch,'i').test(item.country)
      const hasTags = item.tags.some((e)=>new RegExp(recipeSearch,'i').test(e))

      return hasTitle || hasType ||hasCountry || hasTags
    })
  },[data,recipeSearch])

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitleAlign: 'left',
      headerTitle:()=>(
      <TextInput 
        placeholder='Pesquise aqui' 
        value={recipeSearch}  
        fontSize={18} 
        style={styles.search}
        onChangeText={(text)=>setRecipeSearch(text)}
        />
      ),
      headerRight:()=>(
        <TouchableOpacity
          style={{flex:1,alignItems:'center',justifyContent:'center', paddingHorizontal:15}}
        >
          <Icon name='search' size={24}/>
        </TouchableOpacity>
      )
    })
  },[recipeSearch])
  
  function navigate(){
    navigation.navigate('RecipeEdit')
  }
  

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
          nestedScrollEnabled 
          data={dataSearch}
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
    alignItems:'center',
    paddingTop:10
  },
  containerCard:{
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
  search:{
    width:320,
    borderBottomWidth:1,
    paddingHorizontal:5,
    marginLeft:15,
  }
})
