import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function Home(){
  const navigation = useNavigation();

  function navigate(){
    navigation.navigate('Recipe')
  }

  return(
    <View style={styles.container}>
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

