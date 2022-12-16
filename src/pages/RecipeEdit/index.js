import React, { useLayoutEffect,useState } from 'react'
import { View, Text, Button, StyleSheet,ScrollView,TextInput } from 'react-native'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';


export default function Recipe(){
  const [title, setTitle] = useState()
  const [type, setType] = useState()
  const [ingredients, setIngredients] = useState('')
  const [method, setMethod] = useState()
  const [country, setCountry] = useState()
  const [doTimeHours, setDoTimeHours] = useState()
  const [doTimeMin, setDoTimeMin] = useState()
  const [tag, setTag] = useState()
  const [cont, setCont] = useState(2)


  const spliceBreakLine= (text)=>{
    const splitText = text.split('\n')
    const finalText = text.split('\n').map((value,index)=>(index + 1)+ '. ' + value).join('\n')
    console.log(splitText)
    return finalText
  }

  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Nova Receita',
      headerTitleAlign: 'center',
      headerTitleStyle: { 
        fontSize:24,
        fontWeight:'bold',
      }
    })
  }, [navigation])
  return(
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal:20}}>
        <View style={styles.containerText}>
          <Text style={styles.text}>Título</Text>
          <TextInput style={styles.textInput} placeholder={'Título'}/>
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
            // onKeyPress={(event)=>{
            //   if(event.nativeEvent.key == 'Enter'){
            //     const text = method + cont +'. '
            //     console.log(text)
            //     setCont(cont + 1)
            //     setMethod(text)
            //   }
            // }}
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
          <View>
            
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>TAGs</Text>
          <TextInput style={styles.textInput} placeholder={'Brasil'}/>
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
    // width:'100%',
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
  }
})

