import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

export default function Nova({ setNovacampanha, setNovapupli, setNovadenuncia, setNovaOutro, navigation }) {




    return (
        <>
            <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setNovapupli(false) }}>❮</Text>
            </TouchableOpacity>
            <View style={css.caixamaior}>
                <TouchableOpacity style={css.btnV} onPress={() => { setNovacampanha(true); setNovadenuncia(false); setNovaOutro(false); }}>
                    <Text style={css.btnLoginTextV}>+ Campanha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnV} onPress={() => { setNovadenuncia(true); setNovacampanha(false); setNovaOutro(false); }}>
                    <Text style={css.btnLoginTextV}>+ Denuncia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnV} onPress={() => { setNovaOutro(true); setNovadenuncia(false); setNovacampanha(false); }}>
                    <Text style={css.btnLoginTextV}>+ Outros</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
const css = StyleSheet.create({
    caixamaior: {
        flexDirection: "row",
        width: "100%",
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    btnV: {
        width: 120,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginRight: 5,
        marginLeft: 5,
    },
    btnLoginTextV: {
        lineHeight: 45,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400",
        color: "white"
    },
    BTNVoltar: {
        fontSize: 25,
        marginRight: 380,
        marginTop:25
    },
})