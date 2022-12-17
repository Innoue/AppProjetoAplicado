import React, { useLayoutEffect,useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet,ScrollView,TouchableOpacity,FlatList } from 'react-native'
import { useNavigation, useRoute,useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';

export default function Recipe(){
  const navigation = useNavigation();
  const route = useRoute()
  const [tags,setTags] = useState([])

  function navigate(){
    const item = route.params?.item
    navigation.navigate('RecipeEdit',{item})
  }

  useEffect(()=>{
    api.get('/tags')
      .then((response)=>{
        setTags(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  },[])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.item.title,
      headerTitleAlign: 'center',
      headerTitleStyle: { 
        fontSize:24,
        color: '#C16714',
        fontWeight:'bold',
      },
      headerRight: () => (
        <TouchableOpacity 
          style={{flex:1,alignItems:'center',justifyContent:'center', paddingHorizontal:25}}
          onPress={navigate}
        >
          <Icon name='edit' size={24}/>
        </TouchableOpacity>
      ),
    })
  }, [navigation,route.params?.item])
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={{alignItems:'flex-start'}}>
          <Text style={styles.time}>Tempo de preparo: {route.params?.item.doTime}min</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:10}}>
          <Text style={{...styles.title,alignText:'left'}}>Ingredientes</Text>
          <Text style={styles.textRecipe}>{route.params?.item.ingredients}</Text>         
        </View>
        <View style={{alignItems:'flex-start',marginTop:10}}>
          <Text style={{...styles.title,alignText:'left'}}>Modo de preparo</Text>
          <Text>
            {route.params?.item.method}
          </Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
          <Text style={styles.title}>Nacionalidade: </Text>
          <Text style={styles.title}>{route.params?.item.country}</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
          <Text style={styles.title}>Tipo de refeição: </Text>
          <Text style={styles.title}>{route.params?.item.type}</Text>
        </View>

        <View style={{marginTop:10}}>
          <Text style={styles.title}>TAGs </Text>
          <View style={styles.containerTag}>
            <FlatList
              data={route.params?.item.tags}
              renderItem={({item}) => (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{
                    tags.find(({id,name})=>id == item)?.name
                  }</Text>
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              contentContainerStyle={{flexGrow:1,alignItems:'center'}}
              keyExtractor={(item, index) => index}
            />
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
  },
  time:{
    fontSize:12,
    fontStyle:'italic',
  },
  textRecipe:{
    fontSize:15,

  },
  tag:{
    backgroundColor:'orange',
    borderRadius:10,
    paddingHorizontal:7,
    marginHorizontal:5,
    marginVertical:10,
    width:100,
    height:30,
    alignItems:'center',
    justifyContent:'center',
  },
  tagText:{
    fontSize:15,
    textAlign:'center'
  },
  scroll:{
    width:'100%',
    paddingHorizontal:20
  },
  containerTag:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

