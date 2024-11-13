import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Denuncia from "../Components/Denuncias";
import { AuthContext } from '../Context/AuthContext';
import Campanhas from '../Components/Campanhas';
import Outros from '../Components/Outros';
import HomeCom from '../Components/HomeComp';
import Nova from '../Components/Nova';
import NovaCamp from '../Components/NovaCamp';
import NovaDenucia from '../Components/NovaDenuncia';
import NovaPupli from '../Components/NovaPupli';


export default function Home({ navigation }) {

    //Publicação

    const [dados, setDados] = useState([]);
    const [publicacao, setPublicacao] = useState([]);
    const [campanha, setCampanha] = useState([]);
    const [denuncia, setDenuncia] = useState([]);

    const [novapupli, setNovapupli] = useState(false);

    const [novacampanha, setNovacampanha] = useState(false);
    const [novadenuncia, setNovadenuncia] = useState(false);
    const [novaOutro, setNovaOutro] = useState(false);


    //MINHA API 
    async function getDenuncia() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/api/Denuncia/GetAllDenuncias', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                setDenuncia(json);
            })

            .catch(err => console.log(err))
    }


    async function getCampanhas() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/api/Campanhas/GetAllCampanhas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                setCampanha(json);
            })

            .catch(err => console.log(err))
    }

    async function getPublicacao() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/api/Publicacoes/GetAllPublicacoes', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                setPublicacao(json);
            })

            .catch(err => console.log(err))
    }




    function getAll() {
        getCampanhas();
        getDenuncia();
        getPublicacao();
        setDados([...campanha, ...publicacao, ...denuncia]);
    }

    useFocusEffect(
        React.useCallback(() => {
            getAll();
        }, [])
    );

    //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
    return (
        <View style={css.container}>
            {!novapupli &&
                <>
                    <View style={css.caixa}>
                        <TouchableOpacity style={css.btnLogo} onPress={() => { getAll() }}>
                            <Image style={css.tinyLogo} source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} />
                        </TouchableOpacity>
                    </View>

                    <View style={css.CaixaPai3bnt}>
                        <View style={css.btnOutros}>
                            <TouchableOpacity style={css.btnOutros}
                                onPress={() => { getPublicacao(); setDados(publicacao); }}
                            >
                                <Text style={css.Texto}>Outros</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={css.btnCamp}
                                onPress={() => { getCampanhas(); setDados(campanha); }}
                            >
                                <Text style={css.Texto}>Campanhas</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={css.btnDenun}
                                onPress={() => { getDenuncia(); setDados(denuncia); }}
                            >
                                <Text style={css.Texto}>Denuncia</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={css.btn01} onPress={() => setNovapupli(true)}>
                            <Text style={css.TextoBTNC}>Nova Puplicação</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        dados &&
                        <View style={css.Teste}>
                            <FlatList
                                data={dados}
                                renderItem={({ item, index }) =>
                                    <HomeCom
                                        item={item}
                                        navigation={navigation}
                                    />
                                }
                                keyExtractor={(item, index) => index}
                                contentContainerStyle={{ paddingBottom: dados.length * 10 }}
                            />
                        </View>
                    }
                </>
            }
         
            {novapupli &&
                <Nova setNovaOutro={setNovaOutro} setNovacampanha={setNovacampanha} setNovadenuncia={setNovadenuncia} setNovapupli={setNovapupli} />
            }
            {novacampanha && <NovaCamp setnovacampanha={setNovacampanha} />}
            {novadenuncia && <NovaDenucia setNovadenuncia={setNovadenuncia} />}
            {novaOutro && <NovaPupli setNovaOutro={setNovaOutro} />}
        </View>

    )
}



const css = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        flexGrow: 1,
        color: "white",
        alignItems: "center",
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
        marginTop: 15,
    },
    text: {
        color: "black",
        lineHeight: 30,
        fontSize: 20,
        fontWeight: "bold"
    },
    CaixaPai3bnt: {
        flexDirection: "row",
        width: "100%",
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    btnOutros: {
        width: 120,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginRight: 10,
        marginLeft: 10,
    },
    btnCamp: {
        width: 120,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginRight: 10
    },
    btnDenun: {
        width: 120,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginRight: 10
    },
    Texto: {
        fontSize: 22,
        fontWeight: "400",
        color: "white"
    },
    Teste: {
        marginTop: 15,
        height: 620,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    btn01: {
        backgroundColor: "#20343F",
        width: 390,
        height: 50,
        borderRadius: 10,
        color: "white",
    },
    TextoBTNC: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400"
    },
})