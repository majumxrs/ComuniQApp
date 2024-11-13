import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Select from './Select';
import { AuthContext } from '../Context/AuthContext';

export default function NovaPupli({ setNovaOutro }) {

    const [titulo, setTitulo] = useState("");
    const [midia, setMidia] = useState("");
    const [descricao, setDescricao] = useState("");

    const [denunciaId, setDenunciaId] = useState([]);

    const [deubom, setDeubom] = useState(false);
    const [error, setError] = useState(false);

    const [bairros, setBairros] = useState();
    const [bairro, setBairro ] = useState();

    async function SalvarPupli() {

        if (titulo != "" || descricao != "") {
            fetch('http://10.139.75.99:5251/api/Publicacoes/InsertPublicacao', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    publicacaoTitulo: titulo,
                    //publicacaoMidia: midia,
                    publicacaoDescricao: descricao,
                    bairroId: bairro,
                    
                    
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json) {

                        setDeubom(true);
                        setError(false);
                    }
                })
                .catch(err => console.log(err))
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
            .catch(err => setError(true), setDeubom(false))
    }


    useEffect(() => {
        getBairros();
    }, [])

    return (
        <ScrollView  >
            <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setNovaOutro(false) }}>❮</Text>
            </TouchableOpacity>


            <View style={css.caixamaior}>

                <View style={css.container}>
                    <TextInput
                        style={css.input2}
                        textInput={titulo}
                        value={titulo}
                        onChangeText={(digitado) => setTitulo(digitado)}
                        placeholder="O  que aconteceu:"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={css.input2}
                        textInput={descricao}
                        value={descricao}
                        onChangeText={(digitado) => setDescricao(digitado)}
                        placeholder="Descreva o ocorrido:"
                        placeholderTextColor="white"
                    />

                    <Text style={css.mensagem} >Qual Bairro?</Text>
                    <Select data={bairros} setBairro={setBairro} />

                    {deubom &&
                        <>
                            <Text style={css.deuBom}>DEU Bom porra!</Text>
                        </>
                    }
                    {error &&
                        <>
                            <Text style={css.deuRuim} >DEU error seu otario</Text>
                        </>
                    }

                    <View style={css.PaiCadastrar2}>
                        <TouchableOpacity style={css.btn} onPress={() => { SalvarPupli(); }}>
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
        marginTop: 10,
    },
    input2: {
        width: 350,
        height: 50,
        borderColor: "#20343F",
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: "#B3B3B3",
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
        borderRadius: 10
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
    BTNVoltar: {
        fontSize: 15,
        marginRight: 380,
    },
})