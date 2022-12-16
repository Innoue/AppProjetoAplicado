import React, { useLayoutEffect,useState } from 'react'
import { View, Text, Button, StyleSheet,ScrollView,TextInput,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';

export default function RecipeEdit(){
  const [title, setTitle] = useState()
  const [type, setType] = useState()
  const [ingredients, setIngredients] = useState()
  const [method, setMethod] = useState()
  const [country, setCountry] = useState()
  const [doTimeMin, setDoTimeMin] = useState()

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Nova Receita',
      headerTitleAlign: 'center',
      headerTitleStyle: { 
        fontSize:24,
        fontWeight:'bold',
      },
    })
  }, [navigation])

  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);

    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = DATA.find(item => item.id === selectedItems[i]);
      console.log(tempItem);
    }
  };

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
              <Picker.Item label="Café da Manhã" value="breakfast" />
              <Picker.Item label="Refeição" value="meal" />
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
              <Picker.Item label="Brasil" value="br" />
              <Picker.Item label="Argentina" value="ar" />
            </Picker>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Tempo de preparo </Text>
          <View style={{flexDirection:'row', alignItems:'flex-end'}}>
            <TextInput 
              keyboardType='numeric' 
              style={styles.number}
              value={doTimeMin}
              onChangeText={(text)=>setDoTimeMin(text)}
              />
            <Text style={{marginLeft:5}}>min</Text>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>TAGs</Text>
          <View>
            <MultiSelect
              styleDropdownMenu={{borderWidth:1, paddingHorizontal:5, borderRadius:8, height:45}}
              items={DATA}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
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
            />
          </View>
        </View>
        <View style={{marginTop:10, marginBottom:30, flexDirection:'row', justifyContent:'space-around'}}>
          <TouchableOpacity style={styles.button}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

const DATA = [{
    id: '92iijs7yta',
    name: 'Ondo'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
  }, {
    id: '16hbajsabsd',
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
    }
];