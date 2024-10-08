import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'



export default function Denuncia({ denunciaTitulo, denunciaMidia, denunciaDescricao, tipoDenunciaId, publicacaoTitulo, publicacaoMidia, publicacaoDescricao, bairroId, campanhaTitulo, campanhaMidia, campanhaDescricao, tipoCampanhaId, cidadeId }) {
    const getImageSource = () => {
        return `data:image/jpeg;base64,${denunciaMidia}`
    }
    const getImageSource1 = () => {
        return `data:image/jpeg;base64,${campanhaMidia}`
    }
    const getImageSource2 = () => {
        return `data:image/jpeg;base64,${publicacaoMidia}`
    }
    return (

        <View style={css.container}>
            <View style={css.boxTitle}>
                <Text style={css.title}>{denunciaTitulo}</Text>
                <Text style={css.title2}>teste{denunciaDescricao}</Text>
            </View>
            <View style={css.boxImage}>
                <Image style={css.imagemG} source={{ uri: getImageSource() }} />
            </View>
            <Text style={css.title}>{campanhaTitulo}</Text>
            <Text style={css.title2}>{campanhaDescricao}</Text>
            <View style={css.boxImage}>
                <Image source={{ uri: getImageSource1() }} style={css.imagemG} />
            </View>
            <Text style={css.title}>{publicacaoTitulo}</Text>
            <Text style={css.title2}>{publicacaoDescricao}</Text>
            <Text style={css.tBairro}>{bairroId}</Text>
            <View style={css.boxImage}>
                <Image source={{ uri: getImageSource2() }} style={css.imagemG} />
            </View>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        height: 500,
        width: 370,
        backgroundColor: "red",
        marginTop: 25,
    },
    boxTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 50,
        paddingLeft: 5
    },
    title: {
        color: "black",
        textAlign: "center",
        marginTop: 20,
        fontSize: 10,
    },
    boxImage: {
        width: "100%",
        height: 390
    },
    imagemG: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    categoryText: {
        color: "white"
    },
    boxTitle1: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 50,
        paddingLeft: 5
    },
})