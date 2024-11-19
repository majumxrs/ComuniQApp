import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Denuncia({ denunciaMidia, denunciaDescricao }) {
    const getImageSource = () => {
        return `data:image/jpeg;base64,${denunciaMidia}`
    }
    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <Image style={css.Avatar}
                    source={require('../../assets/FotosComuniQ/UsuarioSem.png')}
                />
                <Text style={css.CategoryText}>Anônimo</Text>
            </View>
            <View style={css.boxImage}>
                <Image style={css.imagemG} source={{ uri: getImageSource() }} />
            </View>
            <View style={css.boxTitle2} >
                <Text style={css.title2}>{denunciaDescricao}</Text>
            </View>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: 370,
        backgroundColor: "#D9D9D9",
        marginTop: 25,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    boxImage: {
        width: "90%",
        height: 390,
        marginTop: 10
    },
    imagemG: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10
    },
    boxTitle: {
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "400",
        marginLeft: 10,
        marginTop: 5,
    },
    boxTitle2: {
        width: "100%"
    },
    title2: {
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 15,
        marginTop: 5
    },
    boxTitle2: {
        width: "100%"
    },
    title2: {
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 15,
        marginTop: 5
    },
})