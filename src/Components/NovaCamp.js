import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState } from 'react'
import SelectCampanha from './SelectCampanha';
import SelectCidade from './SelectCidade';

export default function NovaCamp({ setnovacampanha }) {

    const [titulo, setTitulo] = useState("");
    const [midia, setMidia] = useState("");
    const [descricao, setDescricao] = useState("");

    const [cidades, setCidades] = useState();
    const [cidade, setCidade] = useState();

    const [TipoDenuciaNome, setTipoDenunciaNome] = useState("");
    const [TipoNovaCampanha, SetTipoNovaCampanha] = useState();
    const [TipoNovaCampanhas, SetTipoNovaCampanhas] = useState();

    const [deubom, setDeubom] = useState(false);
    const [error, setError] = useState(false);

    async function SalvarCamp() {

        if (titulo != "" || descricao != "") {
            fetch( process.env.EXPO_PUBLIC_URL + '/api/Campanhas/InsertCampanha', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    campanhaTitulo: titulo,
                    //campanhaMidia: midia,
                    campanhaDescricao: descricao,
                    tipoCampanhaId: TipoNovaCampanha.tipoCampanhaId,
                    cidadeId: cidade.cidadeId,
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
                .catch(err => { setError(true); } )
        } else {
            setError(true)
            setDeubom(false)
        }
    }
    async function getCidades() {
        fetch(process.env.EXPO_PUBLIC_URL + '/api/Cidades/GetAllCidades', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    setCidades(json);
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
                    setTipoDenunciaNome(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }

    async function getTipoCampanha() {
        fetch(process.env.EXPO_PUBLIC_URL + '/api/TipoCampanhas/GetAllTipoCampanhas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    SetTipoNovaCampanhas(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }

    useEffect(() => {
        getCidades();
        getTipoDenuncia();
        getTipoCampanha();
    }, [])

    return (
        <ScrollView  >
            <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setnovacampanha(false) }}>❮</Text>
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
                        placeholder="Descreva a campanha:"
                        placeholderTextColor="black"
                    />
                    <Text></Text>
                    <SelectCidade data={cidades} setCidade={setCidade} />
                    <Text></Text>
                    <SelectCampanha data={TipoNovaCampanhas} SetTipoNovaCampanha={SetTipoNovaCampanha} />
                    {deubom &&
                        <>
                            <Text style={css.deuBom}>Nova campanha realizada com sucesso!</Text>
                        </>
                    }
                    {error &&
                        <>
                            <Text style={css.deuRuim} >Não foi possivel realizar a nova campanha!</Text>
                        </>
                    }
                    <View style={css.PaiCadastrar2}>
                        <TouchableOpacity style={css.btn} onPress={() => { SalvarCamp(); }}>
                            <Text style={css.btnLoginText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const css = StyleSheet.create({
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
        height:400
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