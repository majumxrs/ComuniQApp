import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function Galeria() {
    const {setGaleria} = useContext(AuthContext);
  return (
    <View>
        <Text>Galeria</Text>
         <TouchableOpacity style={css.btnV} onPress={() => setGaleria(false)}>
                <Text style={css.btnLoginTextV}>Voltar</Text>
            </TouchableOpacity>
      
    </View>
  )
}

const css = StyleSheet.create({})