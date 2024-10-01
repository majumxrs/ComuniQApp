import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Produto({ setDenunciaTro, denunciaTitulo, denunciaMidia, denunciaDescricao, tipoDenunciaId, bairroId }) {
    return (
        <View style={css.container}>


            <TouchableOpacity style={css.btn} onPress={() => { setDenunciaTro(false) }}>
                <Text style={css.Texto}>Volta</Text>
            </TouchableOpacity>


            <View style={css.boxTitle}>
                <Text>Olahtetse</Text>
                <Text style={css.title}>{denunciaTitulo}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg" }} style={css.imagemG} />
            </View>

        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: 550,
        height: 800,
        backgroundColor: "white",
        marginTop: 25,
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
    title: {
        color: "black",
        textAlign: "center",
        marginTop: 20,
        fontSize: 30,
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