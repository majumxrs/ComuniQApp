import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import NovaCamp from './NovaCamp';
import NovaDenucia from './NovaDenuncia';
import NovaPupli from './NovaPupli';
import { AuthContext } from '../Context/AuthContext';

export default function Nova({setNovapupli}) {

    const [novacampanha, setNovacampanha] = useState(false);
    const [novadenuncia, setNovadenuncia] = useState(false);
    const [novaOutro, setNovaOutro] = useState(false);

    return (
        <View style={css.tudo}>
            <View style={css.caixa}>
                <TouchableOpacity style={css.btnLogo}>
                    <Image style={css.tinyLogo} source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} />
                </TouchableOpacity>
            </View>
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
            {novacampanha && <NovaCamp setnovacampanha={setNovacampanha} setNovapupli={setNovapupli} />}
            {novadenuncia && <NovaDenucia setNovadenuncia={setNovadenuncia} />}
            {novaOutro && <NovaPupli setNovaOutro={setNovaOutro} />}
        </View>
    )
}
const css = StyleSheet.create({
    tudo: {
        width: "100%",
        height: "100%",
    },
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
        marginLeft: 5,
        marginTop: 5
    },
    caixa: {
        height: 100,
        width: "100%",
        backgroundColor: "#20343F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    tinyLogo: {
        width: '100%',
        height: '100%'
    },
    btnLogo: {
        height: 60,
        width: "25%",
        marginTop: 10,
    },
})