import React from 'react'
import { View, StyleSheet } from 'react-native'

import { CardRecipe } from '../../components/CardRecipe';

export default function Home(){
  return(
    <View style={styles.container}>
      <View style={{height:150,width:'90%'}}>
        <CardRecipe title={'Pudim'} type={'Sobremesa'} country={'Brasil'} doTime={50}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
  },
})

