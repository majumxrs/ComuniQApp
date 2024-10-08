import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Denuncia({ setDenunciaTro, denunciaTitulo, denunciaMidia, denunciaDescricao, tipoDenunciaId, bairroId }) {
    const getImageSource = () => {
        return `data:image/jpeg;base64,${denunciaMidia}`
    }
    return (

        <View style={css.container}>
            <View style={css.boxTitle}>
            <View style={css.BoxTitulo}>
                    <Image style={css.Avatar}
                         source={require('../../assets/FotosComuniQ/UsuarioSem.png')}
                    />
                    <Text style={css.CategoryText}>Anônimo</Text>
                </View>
                <Text style={css.title2}>teste{denunciaDescricao}</Text>
            </View>
            <View style={css.boxImage}>
                <Image style={css.imagemG} source={{ uri: getImageSource() }} />
            </View>

        </View>
    )
}
const css = StyleSheet.create({
    container: {
        height: 500,
        width: 370,
        backgroundColor:"#D9D9D9",
        marginTop: 25,
        borderRadius: 10
    },
    boxTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft: 5
    },
    BoxTitulo: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",

    },
    Avatar: {
        width: 50,
        height: 50,
        //backgroundColor:"red",
        borderRadius: 50
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
    categoryBox: {
        width: "100%",
        marginTop: 15
    },
    descriptionBox: {
        width: "100%",
        marginTop: 15,
        padding: 10
    },
    descriptionText: {
        color: "white",
        textAlign: "justify"
    },
    categoryBox: {
        width: "100%",
        padding: 10
    },
    categoryText: {
        color: "white"
    },
    btnDelete: {
        width: 200,
        height: 50,
        margin: 58,
        borderRadius: 10,
        backgroundColor: "#191919",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 120,
    },
    btbLoginText: {
        color: "white",
        fontSize: 30,
        fontWeight: "850"
    },
})