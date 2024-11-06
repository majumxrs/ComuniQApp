import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

export default function Nova({ setNovacampanha, setNovapupli, setNovadenuncia, setNovaOutro}) {

    


    return (
        <ScrollView  >

            <TouchableOpacity style={css.btnV} onPress={() => { setNovapupli(false) }}>
                <Text style={css.btnLoginTextV}>Voltar</Text>
            </TouchableOpacity>

            <View style={css.caixamaior}>
                <TouchableOpacity style={css.btnV} onPress={() => {setNovacampanha(true); setNovadenuncia(false); setNovaOutro(false); }}>
                    <Text style={css.btnLoginTextV}>novacampanha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnV} onPress={() => { setNovadenuncia(true); setNovacampanha(false); setNovaOutro(false); }}>
                    <Text style={css.btnLoginTextV}>setNovadenuncia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnV} onPress={() => { setNovaOutro(true); setNovadenuncia(false); setNovacampanha(false);}}>
                    <Text style={css.btnLoginTextV}>setNovaOutro</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
const css = StyleSheet.create({
    mensagem: {
        margin: 10,
        width: 320
    },
    caixamaior: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
    },
    input2: {
        width: 350,
        height: 50,
        borderColor: "#000",
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: "#B3B3B3",
        marginBottom: 5,
        marginTop: 5,
        padding: 10,
    },
    container: {
        width: "90%",
        height: 600,
        backgroundColor: "#D9D9D9",
        display: "flex",
        alignItems: "center",

    },

    btn: {
        width: 300,
        height: 50,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#20343F"
    },
    btnLoginText: {
        lineHeight: 45,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "400",
        color: "white"
    },
    btnV: {
        width: 150,
        height: 50,
        borderRadius: 10,
        marginTop: 50,
        backgroundColor: "#20343F",
        marginLeft: 20,
    },
    btnLoginTextV: {
        lineHeight: 45,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "400",
        color: "white"
    },
    deuBom: {
        color: "#008000"
    },
    deuRuim: {
        color: "red"
    },
})