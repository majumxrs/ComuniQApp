import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ComentarioComp({usuario, descricao }) {
  return (
    <View>
        <View>
            <Text>{usuario}</Text>
            <Text>{descricao}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})