import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import  { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Teste({ setTeste }) {
    const [denuncia, setDenuncia] = useState([]);
    const [denunciaId, setDenunciaId] = useState([]);
    const [denunciaTitulo, setDenunciaTitulo] = useState([]);
    const [denunciaMidia, setDenunciaMidia] = useState("");
    const [denunciaDescricao, setDenunciaDescricao] = useState([]);
    const [tipoDenunciaId, setTipoDenunciaId] = useState(0);
    const [BairroId, setBairroId] = useState(0);


    async function getDenuncia() {
        await fetch('https://10.139.75.99:5280/api/Denuncia/GetAllDenuncias', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
        },
        })
          .then(res => res.json())
          .then(json => setDenuncia(json))
          .catch(err => console.log(err))
      }

      async function getDenunciaId(id) {
        await fetch('https://10.139.75.99:5280/api/Denuncia/GetDenunciaId/' + id, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(json => {
            setDenunciaId(json.denunciaId);
            setDenunciaTitulo(json.denunciaTitulo);
            setDenunciaMidia(json.denunciaMidia);
            setDenunciaDescricao(json.denunciaDescricao);
            setTipoDenunciaId(json.tipoDenunciaId);
            setBairroId(json.bairroId);
            
          })
          .catch(err => console.log(err))
      }

    useEffect(() => {
        getDenunciaId();
        getDenuncia();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getDenuncia();
            getDenunciaId();
        }, [])
    );

    return (

        <View style={css.container}>
            <View style={css.boxTitle}>
                <Text>teste052015</Text>
            </View>
            

            <TouchableOpacity style={css.btn} onPress={() => { setTeste(false) }}>
                <Text style={css.Texto}>Volta</Text>
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
    }
})