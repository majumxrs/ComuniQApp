import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Conversa({mensagem, userInput}) {
  return (
    <View style={css.container}>
      <Text style={css.mensagem}>{mensagem}</Text>
      <Text style={css.mensagemUsu}>{userInput}</Text>
    </View>
  )
}

const css = StyleSheet.create({
    mensagem: {
        backgroundColor: "#D9D9D9",
        margin: 10,
        width: 320
    
      },
    
      mensagemUsu: {
        backgroundColor: '#515151',
        color: 'white',
        width: 280,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 10,
        marginLeft: 120
       },
})