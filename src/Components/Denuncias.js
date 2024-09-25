import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Produto({ denunciaId, denunciaTitulo, denunciaMidia, denunciaDescricao, tipoDenunciaId, bairroId  }) {
    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <View style={css.circleAvatar}>
                    <Image source={{ uri: denunciaMidia }} style={css.imagem} />
                </View>
                <Text style={css.title}>{denunciaTitulo}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: denunciaMidia }} style={css.imagemG} />
            </View>

            <TouchableOpacity onPress={() => { setDetalhes(false); getPessoaId(pessoaId); getObservação(pessoaId) }} style={css.btnDelete}>
                <Text style={css.btbLoginText}>Detalhes</Text>
            </TouchableOpacity>

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
   /* boxTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft: 5
    },
    circleAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
        marginRight: 10
    },
    title: {
        color: "black",
        textAlign: "center",
        marginTop: 20,
        fontSize:30,
    },*/
    boxImage: {
        width: "100%",
        height: 390,
        borderColor: "red",
    },
    imagemG: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    imagem: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 50,
        marginTop: 10,
    },/*
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
    },*/
})