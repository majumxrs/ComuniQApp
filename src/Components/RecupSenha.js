import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, ImageBackground, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function RecupSenha({ setRecupSenha}) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");



    const { Login, menReupSenha } = useContext(AuthContext);

    async function SalvaRecpSenha(id) {
        await fetch('http://localhost:5280/api/Usuarios/UpdateUsuario/' + id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                usuarioEmail: email,
                usuarioSenha: senha
            })
        })
            //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }


    return (
        <ScrollView contentContainerStyle={css.container}>
            <ImageBackground source={require('../../assets/FotosComuniQ/WhatsApp Image 2024-09-18 at 12.04.50.jpeg')} resizeMode="cover" style={css.image} >
                <View style={css.Caixalogocadast}>
                    <TouchableOpacity style={css.btnLogo} onPress={() => { setRecupSenha(false) }}>
                        <Image source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} style={css.logo} />
                    </TouchableOpacity>
                </View>

                <SafeAreaView >
                    <ScrollView>
                        <View style={css.PaiInput}>
                            <Text style={css.TextoRecupSenha}>Recuperar Senha</Text>
                            <TextInput
                                style={css.input2}
                                textInput={email}
                                value={email}
                                onChangeText={(digitado) => setEmail(digitado)}
                                placeholder="Email:"
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={css.input2}
                                // textInput={senha}
                                // value={senha}
                                onChangeText={(digitado) => setSenha(digitado)}
                                placeholder="Codigo Valido:"
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={css.input2}
                                textInput={senha}
                                value={senha}
                                onChangeText={(digitado) => setSenha(digitado)}
                                placeholder="Senha:"
                                placeholderTextColor="white"
                            />
                            <View style={css.PaiRecupSenha}>
                                <TouchableOpacity style={css.btn} onPress={() => { SalvaRecpSenha(); setRecupSenha(false) }}>
                                    <Text style={css.Texto}>Salvar</Text>

                                </TouchableOpacity>
                                {menReupSenha &&
                                    <View style={css.error}>
                                        <Text style={css.errorText}>Email ou Senha incorretos!</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <Text onPress={() => setRecupSenha(false)}>Voltar</Text>
            </ImageBackground>

        </ScrollView>
    )
}
const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#C7BB9D"
    },
    image: {
        flex: 1,
        width: 410,
        opacity: 1.5
    },
    Caixalogocadast: {
        marginTop: "10%",
        width: "50%",
        height: 95,
        display: "flex",
        alignItems: "center",
        marginLeft: 105,
    },
    tinyLogo: {
        width: 10,
        height: 10
    },
    logo: {
        width: 180,
        height: 180,
        borderRadius: 200
    },
    TextoRecupSenha: {
        fontSize: 30,
        fontWeight: "400",
        color: "white",
        marginTop: 20
    },
    PaiInput: {
        marginLeft: "2%",
        display: "flex",
        alignItems: "center",
        width: "95%",
        marginTop: "30%",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: 15,
        padding: 20

    },
    input2: {
        width: 350,
        height: 50,
        borderColor: "#000",
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: "#B3B3B3",
        marginTop: 20,
        padding: 10,
    },
    PaiRecupSenha: {
        alignItems: "center"
    },
    btn: {
        width: 350,
        height: 50,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#20343F",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    },
    Texto: {
        fontSize: 30,
        fontWeight: "400",
        color: "white"
    },
    errorText: {
        color: "white",
        textAlign: "center"
    },
})