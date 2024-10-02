import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'


export default function Campanhas({ campanhaTitulo, campanhaMidia, campanhaDescricao, tipoCampanhaId, cidadeId  }) {

    return (
        <View style={css.container}>
        <View style={css.boxTitle}>
            <Text style={css.title}>{campanhaTitulo}</Text>
            <Text style={css.title2}>{campanhaDescricao}</Text>
        </View>
        <View style={css.boxImage}>
            <Image source={{ uri: campanhaMidia }} style={css.imagemG} />
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
    }
})