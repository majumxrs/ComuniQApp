import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Outros({ publicacaoTitulo , publicacaoMidia, publicacaoDescricao, bairroId }) {
    return (

        <View style={css.container}>
        <View style={css.boxTitle}>
            <Text style={css.title}>{publicacaoTitulo}</Text>
            <Text style={css.title2}>{publicacaoDescricao}</Text>
            <Text style={css.tBairro}>{bairroId}</Text>
        </View>
        <View style={css.boxImage}>
            <Image source={{ uri: publicacaoMidia }} style={css.imagemG} />
        </View>

    </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: 350,
        height: 600,
        backgroundColor: "white",
        marginTop: 25,
    },
    imagemG:{
        width:50,
        height:50,
        marginLeft:50,
    }
})