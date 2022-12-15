import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { CardRecipe } from '../../components/CardRecipe';

export default function Home(){
  const navigation = useNavigation();

  function navigate(){
    navigation.navigate('Recipe')
  }

  return(
    <View style={styles.container}>
      <View style={{height:150,width:'90%'}}>
        <CardRecipe title={'Pudim'} type={'Sobremesa'} country={'Brasil'} doTime={50}/>
      </View>
      <Text>Home</Text>
      <Button title='Recipe' onPress={navigate}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

