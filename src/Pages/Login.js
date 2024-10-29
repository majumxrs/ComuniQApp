import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Link } from '@react-navigation/native';
import RecupSenha from '../Components/RecupSenha';


export default function Login({ navigation }) {


    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [apelido, setApelido] = useState("");
    const [email, setEmail] = useState("");
    const [telelfone, setTelefone] = useState("");
    const [CPF, setCpf] = useState("");
    const [CEP, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [estado, setEstado] = useState("");
    const [senha, setSenha] = useState("");


    const [cadastro, setCadastro] = useState(false);
    const [recupSenha, setRecupSenha] = useState(false);

    const { Login, error } = useContext(AuthContext);

    function RealizaLogin() {
        Login(email, senha);
    }

    async function SalvarCadastro() {
        await fetch('http://10.139.75.27:5251/api/Usuarios/InsertUsuario', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                usuarioNome: nome,
                usuarioSobrenome: sobrenome,
                usuarioApelido: apelido,
                usuarioEmail: email,
                usuarioTelefone: telelfone,
                usuarioCPF: CPF,
                usuarioCEP: CEP,
                usuarioCidade: cidade,
                usuarioBairro: bairro,
                usuarioEstado: estado,
                usuarioSenha: senha,
                usuarioFoto: null,
                tipoPerfilId: 1
            })
        })
            //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                // usuarioNome: setNome( " " )
                // usuarioSobrenome: setSobrenome( " " )
                // usuarioApelido: setApelido( " " )
                // usuarioEmail: setEmail( " " )
                // usuarioTelefone: setTelefone( " " )
                // usuarioCPF: setCpf( " " )
                // usuarioCEP: setCep( " " )
                // usuarioCidade: setCidade( " " )
                // usuarioBairro: setBairro( " " )
                // usuarioEstado: setEstado( " " )
                // usuarioSenha: setSenha( " " )
            })
            .catch(err => console.log(err))
    }

     if (recupSenha) {
        return (<RecupSenha setRecupSenha={setRecupSenha} setCadastro={setCadastro} />)
    }


    return (
        <ScrollView contentContainerStyle={css.container}>
            <ImageBackground source={require('../../assets/FotosComuniQ/WhatsApp Image 2024-09-18 at 12.04.50.jpeg')} resizeMode="cover" style={css.image}  >
                {cadastro ?
                    <>
                        <View style={css.Caixalogocadast}>
                            <TouchableOpacity style={css.btnLogo} onPress={() => { setCadastro(false) }}>
                                <Image source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} style={css.logo} />
                            </TouchableOpacity>
                        </View>
                        <SafeAreaView >
                            <ScrollView>
                                <View style={css.PaiInput}>
                                    <TextInput
                                        style={css.input2}
                                        textInput={nome}
                                        value={nome}
                                        onChangeText={(digitado) => setNome(digitado)}
                                        placeholder="Nome Completo:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={sobrenome}
                                        value={sobrenome}
                                        onChangeText={(digitado) => setSobrenome(digitado)}
                                        placeholder="Sobrenome:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={apelido}
                                        value={apelido}
                                        onChangeText={(digitado) => setApelido(digitado)}
                                        placeholder="Apelido:"
                                        placeholderTextColor="white"
                                    />
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
                                        textInput={telelfone}
                                        value={telelfone}
                                        type="number"
                                        onChangeText={(digitado) => setTelefone(digitado)}
                                        placeholder="Telefone:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={CPF}
                                        value={CPF}
                                        onChangeText={(digitado) => setCpf(digitado)}
                                        placeholder="CPF:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={CEP}
                                        value={CEP}
                                        onChangeText={(digitado) => setCep(digitado)}
                                        placeholder="CEP:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={cidade}
                                        value={cidade}
                                        onChangeText={(digitado) => setCidade(digitado)}
                                        placeholder="Cidade:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={bairro}
                                        value={bairro}
                                        onChangeText={(digitado) => setBairro(digitado)}
                                        placeholder="Bairro:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={estado}
                                        value={estado}
                                        onChangeText={(digitado) => setEstado(digitado)}
                                        placeholder=" Estado:"
                                        placeholderTextColor="white"
                                    />
                                    <TextInput
                                        style={css.input2}
                                        textInput={senha}
                                        value={senha}
                                        secureTextEntry={true}
                                        onChangeText={(digitado) => setSenha(digitado)}
                                        placeholder="Senha:"
                                        placeholderTextColor="white"
                                    />
                                    <View style={css.PaiCadastrar2}>
                                        <TouchableOpacity style={css.btn} onPress={() => { SalvarCadastro(); setCadastro(false) }}>
                                            <Text style={css.Texto}>Cadastrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </>
                    :
                    <>
                        <View style={css.Caixalogocadast}>
                            <Image source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} style={css.logo} />
                        </View>
                        <View style={css.PaiInput}>
                            <TextInput
                                inputMode="email"
                                placeholder="Email do usuario:"
                                style={css.input}
                                value={email}
                                onChangeText={(digitado) => setEmail(digitado)}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                inputMode="text"
                                placeholder="Senha:"
                                secureTextEntry={true}
                                style={css.input}
                                value={senha}
                                onChangeText={(digitado) => setSenha(digitado)}
                                placeholderTextColor="white"
                            />
                            <View style={css.ViewCadastrar}>
                                <View style={css.forgot2}>
                                    <Text style={css.forgot2Texto}>Ja tem uma conta? Caso não</Text>
                                </View>
                                <View style={css.forgot}>
                                    <TouchableOpacity onPress={() => setCadastro(true)}>
                                        <Text style={css.forgotText}>Cadastre-se</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={css.ViewCadastrar}>
                                <View style={css.forgot2}>
                                    <Text style={css.forgot2Texto}>Esqueceu sua senha?</Text>
                                </View>
                                <View style={css.forgot}>
                                    <TouchableOpacity onPress={ () => setRecupSenha(true)}>
                                        <Text style={css.forgotText}>Recuperar Senha</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                                <Text style={css.btnLoginText}>Entrar</Text>
                            </TouchableOpacity>
                            {error &&
                                <View style={css.error}>
                                    <Text style={css.errorText}>Email ou Senha incorretos!</Text>
                                </View>
                            }
                            <View>
                                <View style={css.ou}>
                                    <Text style={css.outexto}>Ou</Text>
                                </View>
                                <View style={css.PaiImagens}>
                                    <Image source={require("../../assets/FotosComuniQ/ComuniQ (1).png")} style={css.Gogle} />
                                    <Image source={require("../../assets/FotosComuniQ/ComuniQ (2).png")} style={css.winds} />
                                    <Image source={require("../../assets/FotosComuniQ/ComuniQ (3).png")} style={css.maca} />
                                </View>
                            </View>
                        </View>

                    </>
                }

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
    Caixalogo: {
        width: 280,
        height: 60,
        marginBottom: 250,
    },
    logo: {
        width: 180,
        height: 180,
        borderRadius: 200
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
    input: {
        width: "100%",
        height: 45,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#B3B3B3",
        color: "black",
        borderWidth: 1,
        marginTop: 30
    },
    ViewCadastrar: {
        display: "flex",
        flexDirection: "row"
    },
    forgot2: {
        width: "60%",
        // marginTop: 10,
        color: "white",
        // marginLeft: 
    },
    forgot: {
        width: "40%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "#47B8CA",
        fontWeight: "400"
    },
    btnLogin: {
        width: "100%",
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
    error: {
        width: "100%",
        height: 50,
        marginTop: 30
    },
    errorText: {
        color: "white",
        textAlign: "center"
    },
    PaiImagens: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 40,
        columnGap: 30
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
        marginBottom: 5,
        marginTop: 5,
        padding: 10,
    },
    PaiCadastrar2: {
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
    Gogle: {
        width: 60,
        height: 60
    },
    winds: {
        width: 50,
        height: 50
    },
    maca: {
        width: 70,
        height: 70,
    },
    forgot2Texto: {
        color: "#fff"
    },
    ou: {
        marginTop: 40,
        marginLeft: 90
    },
    outexto: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "400",
    },

})