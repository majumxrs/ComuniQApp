import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Produto({ title, image, setDetalhes }) {
    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <View style={css.circleAvatar}>
                    <Image source={{ uri: image }} style={css.circleAvatar} />
                </View>
                <Text style={css.title}>{title}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: image }} style={css.imagem} />
            </View>
            <TouchableOpacity style={css.btnLogin} onPress={() => setDetalhes() } >
                <Text style={css.btnLoginText}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: "100%",
        height: 600
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
    circleAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
        marginRight: 10
    },
    title: {
        color: "white",
        textAlign: "center",
        fontSize: 30,
    },
    boxImage: {
        width: 400,
        height: 390
    },
    imagem: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    btnLogin: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#C7BB9D"
    },
    btnLoginText: {
        color: "black",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
})