import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

export default function Campanha({ setCampanhas }) {
    return (
        <>
            <SafeAreaView style={css.container}>
                <ScrollView>
                    <View style={css.caixa}>
                        <Image
                            style={css.tinyLogo}
                            source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
                        />
                    </View >
                    <View style={css.CaixaPaiTresBtn} >
                        <View  style={css.Btn}>
                            <TouchableOpacity style={css.btn} onPress={() => { setCampanhas(false) }}>
                                <Text style={css.Texto}></Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={css.btn} onPress={() => { setCampanhas(false) }}>
                                <Text style={css.Texto}></Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={css.btn} onPress={() => { setCampanhas(false) }}>
                                <Text style={css.Texto}></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
    },
    caixa: {
        height: 95,
        width: "100%",
        backgroundColor: "#20343F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    tinyLogo: {
        height: 60,
        width: "25%",
        marginTop: 15,
    },
})