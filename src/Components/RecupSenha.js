import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, ImageBackground, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function RecupSenha({ setRecupSenha }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");



    const { Login, menReupSenha } = useContext(AuthContext);

    async function SalvaRecpSenha() {
        try {
            // Monta a URL com os parâmetros necessários
            const url = process.env.EXPO_PUBLIC_URL +`/api/Usuarios/RecuperarSenha?email=${encodeURIComponent(email)}&novaSenha=${encodeURIComponent(senha)}&cpf=${encodeURIComponent(cpf)}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Erro', errorData.message || 'Ocorreu um erro ao recuperar a senha.');
                return;
            }

            const data = await response.json();
            Alert.alert('Sucesso', 'Senha recuperada com sucesso!'); // ou qualquer outra ação desejada
            console.log(data); // Aqui você pode processar a resposta da API como necessário

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Erro', 'Erro ao tentar recuperar a senha. Tente novamente mais tarde.');
        }
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
                                inputMode='email'
                            />
                            <TextInput
                                style={css.input2}
                                textInput={cpf}
                                value={cpf}
                                onChangeText={(digitado) => setCpf(digitado)}
                                placeholder="CPF:"
                                placeholderTextColor="white"
                                keyboardType='numeric'
                            />
                            <TextInput
                                style={css.input2}
                                textInput={senha}
                                value={senha}
                                onChangeText={(digitado) => setSenha(digitado)}
                                placeholder="Senha:"
                                placeholderTextColor="white"
                                secureTextEntry
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