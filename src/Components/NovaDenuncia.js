import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SelectDenuncia from './SelectDenuncia';
import SelectOutros from './SelectOutros';

export default function NovaDenucia({ setNovadenuncia }) {

    const [titulo, setTitulo] = useState("");
    const [midia, setMidia] = useState("");
    const [descricao, setDescricao] = useState("");

    const [tipoDenuncias, setTipoDenuncias] = useState("");
    const [tipoDenuncia, setTipoDenuncia] = useState();


    const [bairros, setBairros] = useState();
    const [bairro, setBairro ] = useState();

    const [deubom, setDeubom] = useState(false);
    const [error, setError] = useState(false);

    async function SalvarPupli() {

        if (titulo != "" || descricao != "") {
            fetch(process.env.EXPO_PUBLIC_URL + '/api/Denuncia/InsertDenuncia', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    denunciaTitulo: titulo,
                    //denunciaMidia: midia,
                    denunciaDescricao: descricao,
                    tipoDenunciaId: tipoDenuncia.tipoDenunciaId,
                    bairroId: bairro.bairroId,
                })
            })
                .then((res) => res.json())
                .then((json) => {

                    console.log( json );
                    if (json) {

                        setDeubom(true);
                        setError(false);
                    }
                })
                .catch(err => { setError(true); setDeubom(false); })
        } else {
            setError(true)
            setDeubom(false)
        }
    }

    async function getBairros() {
        fetch(process.env.EXPO_PUBLIC_URL + '/api/Bairros/GetAllBairros', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    setBairros(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }

    async function getTipoDenuncia() {
        fetch(process.env.EXPO_PUBLIC_URL + '/GetAllTipoDenuncias', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    setTipoDenuncias(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }



    useEffect(() => {
        getBairros();
        getTipoDenuncia();
    }, [])

    return (
        <ScrollView  >
            <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setNovadenuncia(false) }}>❮</Text>
            </TouchableOpacity>

            <View style={css.caixamaior}>

                <View style={css.container}>
                    <Text></Text>
                    <TextInput
                        style={css.input2}
                        textInput={titulo}
                        value={titulo}
                        onChangeText={(digitado) => setTitulo(digitado)}
                        placeholder="O que aconteceu:"
                        placeholderTextColor="black"
                    />
                    <Text></Text>
                    <TextInput
                        style={css.input2}
                        textInput={descricao}
                        value={descricao}
                        onChangeText={(digitado) => setDescricao(digitado)}
                        placeholder="Descreva o ocorrido:"
                        placeholderTextColor="black"
                    />
                    <Text></Text>
                    <SelectOutros data={bairros} setBairro={setBairro} />
                    <Text></Text>
                    <SelectDenuncia data={tipoDenuncias} setTipoDenuncia={setTipoDenuncia} />
                    {deubom &&
                        <>
                            <Text style={css.deuBom}>Nova Denuncia realizada com sucesso!</Text>
                        </>
                    }
                    {error &&
                        <>
                            <Text style={css.deuRuim} >Não foi possivel realizar a nova denuncia!</Text>
                        </>
                    }

                    <View style={css.PaiCadastrar2}>
                        <TouchableOpacity style={css.btn} onPress={() => { SalvarPupli() }}>
                            <Text style={css.btnLoginText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

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
        borderColor: "#20343F",
        borderRadius: 15,
        backgroundColor: "#fff",
        marginBottom: 5,
        marginTop: 5,
        padding: 10,
    },
    container: {
        backgroundColor: "#B3B3B3",
        flexGrow: 1,
        color: "white",
        alignItems: "center",
        width: 380,
        borderRadius: 10,
        height:390
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
    deuBom: {
        color: "#008000"
    },
    deuRuim: {
        color: "red"
    },
    BTNVoltar: {
        fontSize: 15,
        marginRight: 380,
    },
})