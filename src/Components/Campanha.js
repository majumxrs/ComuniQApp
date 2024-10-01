import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Denuncia from "../Components/Denuncias";
import Outros from '../Components/Outros';

export default function Campanha({ setCampanhas }) {

    const [denunciatro, setDenunciaTro] = useState(false);
    const [outros, setOutros] = useState(false);
    const [denunciaApi, setDenunciaApi] = useState([]);
    const [ campanhaTitulo, setCampanhaTitulo ] = useState("");
    const [campanhaMidia, setCampanhaMidia] = useState();
    const [campanhaDescricao, setCampanhaDescricao] = useState("");
    const [tipoCampanha, setTipoCampanha] = useState("");
    const [cidadeId, setCidadeId] = useState("");

    if (outros) {
        return (<Outros setOutros={setOutros} setDenunciaTro={setDenunciaTro} />)
    }
    if (denunciatro) {
        return (<Denuncia setDenunciaTro={setDenunciaTro} setOutros={setOutros} />)
    }

    async function getAnimais() {
        await fetch('http://10.139.75.34:5280/api/Campanhas/GetAllCampanhas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })

            //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
            .then(res => res.json())
            .then(json => setDenunciaApi(json))
            .catch(err => console.log(err))
    }

    async function getAnimal(id) {
        await fetch('http://10.139.75.34:5280/api/Campanhas/GetCampanhaId/' + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
            .then(res => res.json())
            .then(json => {
                setCampanhaTitulo(json.campanhaTitulo);
                setCampanhaMidia(json.campanhaMidia);
                setCampanhaDescricao(json.campanhaDescricao);
                setTipoCampanha(json.tipoCampanhaId);
                setCidadeId(json.cidadeId);
            })
            .catch(err => console.log(err))
    }


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
                        <View style={css.BtnDenun}>
                            <TouchableOpacity style={css.btn} onPress={() => { setDenunciaTro(true) }}>
                                <Text style={css.Texto}>Denuncias</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={css.BtnOutros}>
                            <TouchableOpacity style={css.btn} onPress={() => { setOutros(true) }}>
                                <Text style={css.Texto}>Outros</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={css.BtnCamp}>
                            <TouchableOpacity style={css.btncamp} onPress={() => { setCampanhas(false) }}>
                                <Text style={css.Texto}>Campanhas</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={animais}
                            style={css.Flat}
                            renderItem={({ item }) => <Produto
                                title={item.campanhaTitulo}
                                image={item.animalFoto}
                                setDetalhes={() => { setDetalhes(true); getAnimal(item.animaisId) }}
                            />}
                            keyExtractor={(item) => item.animaisId}
                            contentContainerStyle={{ height: (animais.length * 600) + 110 }}
                        />

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
    CaixaPaiTresBtn: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    BtnDenun: {
        width: 120,
        height: 70,
        display: "flex",
        justifyContent: "center"
    },
    BtnOutros: {
        width: 120,
        height: 70,
        display: "flex",
        justifyContent: "center"
    },
    BtnCamp: {
        width: 120,
        height: 70,
        display: "flex",
        justifyContent: "center"
    },
    btn: {
        width: 100,
        height: 60,
        borderRadius: 10,
        // marginTop: 30,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    },
    btncamp: {
        width: 110,
        height: 60,
        borderRadius: 10,
        // marginTop: 30,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    },
    Texto: {
        fontSize: 20,
        fontWeight: "400",
        color: "white"
    },
})