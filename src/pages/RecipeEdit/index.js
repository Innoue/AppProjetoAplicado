import React, { useEffect, useLayoutEffect,useState } from 'react'
import { View, Text, Button, StyleSheet,ScrollView,TextInput,TouchableOpacity } from 'react-native'
import { useNavigation, StackActions, useRoute  } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import {  } from '@react-navigation/native';
import api from '../../services/api';

export default function RecipeEdit(){
  const route = useRoute()
  const{
    title:itemTitle,
    type:itemType,
    ingredients:itemIngredients,
    method:itemMethod,
    country:itemCountry,
    doTime:itemdoTime,
    tags:itemTags
  }=route.params?.item||{}

  const [title, setTitle] = useState()
  const [type, setType] = useState('')
  const [ingredients, setIngredients] = useState()
  const [method, setMethod] = useState()
  const [country, setCountry] = useState('')
  const [doTime, setdoTime] = useState()
  const [tags, setTags] = useState([])
  const [tagList, setTagList]=useState([])

  const navigation = useNavigation()
  const popAction = StackActions.pop(1)


  useEffect(()=>{
    setTitle(itemTitle||'')
    setType(itemType||'Café da Manhã')
    setIngredients(itemIngredients||'')
    setMethod(itemMethod||'')
    setCountry(itemCountry||'Brasil')
    setdoTime(itemdoTime||0)
    setTags(itemTags)
    console.log(tags)
  },[route])

  useEffect(()=>{
    api.get('/tags')
      .then((response)=>{
        setTagList(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  },[])

  function addItem(data=[]){
    api.post('/tags',{name : data[data.length-1].name})
    .then((response)=>{
      setTagList(data)
      console.log(data)
    })
    .catch((error)=>{
      console.log(error)
    }) 
  }

  function create(){  
    if(!route.params?.item){
      api.post('/recipe', {
        title:title,
        type:type,
        ingredients:ingredients,
        method:method,
        country:country,
        doTime:doTime,
        tags:tags
      })
      .then(function (response) {
        navigation.dispatch(popAction)
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      api.put('/recipe/'+route.params?.item.id, {
        title:title,
        type:type,
        ingredients:ingredients,
        method:method,
        country:country,
        doTime:doTime,
        tags:tags
      })
      .then(function (response) {
        navigation.navigate('Recipe',{
          item: { 
            id:route.params?.item.id,
            title,
            type,
            ingredients,
            method,
            country,
            doTime,
            tags,
          }
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.item.title ? 'Editar Receita' : 'Nova Receita',
      headerTitleAlign: 'center',
      headerTitleStyle: { 
        fontSize:24,
        fontWeight:'bold',
      },
    })
  }, [navigation])

  return(
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal:20}}>
        <View style={styles.containerText}>
          <Text style={styles.text}>Título</Text>
          <TextInput 
            value={title}
            onChangeText={(text)=>setTitle(text)}
            style={styles.textInput} 
            placeholder={'Título'}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Tipo</Text>
          <View style={{borderWidth:1,borderRadius:15}}>
            <Picker
              style={styles.textInput}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) =>
                setType(itemValue)
              }>
              <Picker.Item label="Café da Manhã" value="Café da Manhã" />
              <Picker.Item label="Refeição" value="Refeição" />
              <Picker.Item label="Snack" value="Snack" />
              <Picker.Item label="Bebida" value="Bebida" />
              <Picker.Item label="Café da tarde" value="Café da tarde" />
              <Picker.Item label="Outros" value="Outros" />
            </Picker>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Ingredientes</Text>
          <TextInput 
            style={[styles.textInput,styles.textInputMultilines]}
            placeholder={'Ingredientes'} 
            multiline
            numberOfLines={4} 
            value={ingredients}
            onChangeText={(text)=>setIngredients(text)}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Modo de preparo</Text>
          <TextInput
            style={[styles.textInput,styles.textInputMultilines]} 
            placeholder={'Modo de preparo'}  
            value={method}
            multiline
            numberOfLines={4}
            onChangeText={(text)=>setMethod(text)}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Nacionalidade</Text>
          <View style={{borderWidth:1,borderRadius:15}}>
            <Picker
              style={styles.textInput}
              selectedValue={country}
              onValueChange={(itemValue, itemIndex) =>setCountry(itemValue)}>
              <Picker.Item label="Brasil" value="Brasil" />
              <Picker.Item label="Argentina" value="Argentina" />
              <Picker.Item label="Japão" value="Japão" />
              <Picker.Item label="Alemanha" value="Alemanha" />
              <Picker.Item label="Espanha" value="Espanha" />
              <Picker.Item label="Itália" value="Itália" />
            </Picker>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Tempo de preparo </Text>
          <View style={{flexDirection:'row', alignItems:'flex-end'}}>
            <TextInput 
              keyboardType='numeric' 
              style={styles.number}
              value={doTime}
              onChangeText={(text)=>setdoTime(text)}
              />
            <Text style={{marginLeft:5}}>min</Text>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>TAGs</Text>
          <View>
            <MultiSelect
              styleDropdownMenu={{borderWidth:1, paddingHorizontal:5, borderRadius:8, height:45}}
              items={tagList}
              uniqueKey="name"
              onSelectedItemsChange={setTags}
              selectedItems={tags}
              selectText="Selecione as TAGs"
              searchInputPlaceholderText="Procure aqui"
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#00BFA5"
              submitButtonText="Submit"
              canAddItems={true}
              onAddItem={addItem}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{marginTop:10, marginBottom:10, flexDirection:'row', justifyContent:'space-around'}}>
          <TouchableOpacity onPress={()=>navigation.dispatch(popAction)} style={styles.button}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={create} style={styles.button}>
            <Text>Salvar</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  textInput:{
    padding:10,
    paddingHorizontal:15,
    borderWidth:1,
    borderRadius:15,
    fontSize:14
  },
  containerText:{
    marginBottom: 10
  },
  text:{
    marginBottom:5,
    fontWeight:'bold',
    fontSize:20,
    paddingLeft:5
  },
  textInputMultilines:{
    textAlignVertical:'top'
  },
  number:{
    borderWidth:1,
    marginLeft:10,
    paddingLeft:5,
    paddingHorizontal:30,
    borderRadius:8,
    fontSize:14
  },
  button:{
    flex:1, 
    marginHorizontal:10,
    borderWidth:1,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  }
})
