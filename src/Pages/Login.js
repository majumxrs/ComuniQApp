import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import Cadastro from '../Components/Cadastro';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cadastro, setCadastro] = useState(false);
    const [tel, setTel] = useState("");
    const [nome, setNome] = useState("");

    const { Login, error } = useContext(AuthContext);

    function RealizaLogin() {
        Login(email, senha);
    }


    return (
        <ScrollView contentContainerStyle={css.container}>
            {cadastro ?
                <View style={css.CaixaTotal}>
                    <View style={css.caixa}>
                        <Image
                            style={css.tinyLogo}
                            source={require("../../assets/LogoAppAchôCerta.png")}
                        />
                    </View>
                    <SafeAreaView contentContainerStyle={css.container}>
                        <ScrollView>
                            <TouchableOpacity>
                                <Text style={css.BTNVoltar} onPress={() => setCadastro(false)}>❮</Text>
                            </TouchableOpacity>
                            <View style={css.PaiCadastrar}>
                                <Text style={css.nomePag}>Cadastrar-se</Text>
                            </View>
                            <View style={css.PaiOu}>
                                <Text style={css.ou}>Ou</Text>
                            </View>
                            <View style={css.PaiInput}>
                                <TextInput style={css.input2} textInput={nome} value={nome} onChangeText={(digitado) => setNome(digitado)} placeholder="Nome Completo:" />
                                <TextInput style={css.input2} textInput={tel} value={tel} onChangeText={(digitado) => setTel(digitado)} placeholder="Telefone:" />
                                <TextInput style={css.input2} textInput={email} value={email} onChangeText={(digitado) => setEmail(digitado)} placeholder="Email:" />
                                <TextInput style={css.input2} textInput={senha} value={senha} onChangeText={(digitado) => setSenha(digitado)} placeholder="Senha:" />
                            </View>
                            <View style={css.PaiCadastrar}>
                                <TouchableOpacity style={css.btn}>
                                    <Text style={css.Texto}>Cadastrar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
                :
                <>
                    <View style={css.Caixalogo}>
                        <Image source={require("../../assets/LogoAppAchôCerta.png")} style={css.logo} />
                    </View>
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
                            <Text>Ainda não tem uma conta?</Text>
                        </View>
                        <View style={css.forgot}>
                            <TouchableOpacity onPress={() => setCadastro(true)}>
                                <Text style={css.forgotText}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                        <Text style={css.btnLoginText}>ENTRAR</Text>
                    </TouchableOpacity>
                    {error &&
                        <View style={css.error}>
                            <Text style={css.errorText}>Email ou Senha incorretos!</Text>
                        </View>
                    }
                    <View>
                        <View style={css.PaiImagens}>
                            <Image source={require("../../assets/FotosAchô/facebook.png")} style={css.Face} />
                            <Image source={require("../../assets/FotosAchô/google (1).png")} style={css.Gogle} />
                            <Image source={require('../../assets/FotosAchô/twitter.png')} style={css.x} />
                        </View>
                    </View>
                </>
            }
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
    Caixalogo: {
        width: 280,
        height: 60,
        marginBottom: 250,
    },
    logo: {
        width: 300,
        height: 200,
    },
    input: {
        width: "90%",
        height: 60,
        borderRadius: 10,
        marginBottom: 30,
        padding: 10,
        backgroundColor: "#EFDFBE",
        color: "black",
        borderWidth: 1,
    },
    ViewCadastrar: {
        display: "flex",
        flexDirection: "row"
    },
    forgot2: {
        width: "50%",
        // marginTop: 10,
    },
    forgot: {
        width: "30%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "#C77529",
        fontWeight: "bold"
    },
    btnLogin: {
        width: "50%",
        height: 50,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#EFDFBE"
    },
    btnLoginText: {
        color: "black",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
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
        //alignItems:"center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 20
    },
    Gogle: {
        marginRight: 30,
    },
    Face: {
        width: 60,
        height: 70,
        marginRight: 30,
        marginTop: -5,
    },
    x: {
        width: 60,
        height: 70
    },
    PaiInput: {
        display: "flex",
        alignItems: "center",
    },
    input2: {
        width: "80%",
        height: 50,
        borderColor: "#C9994D",
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: "#EFDFBE",
        marginBottom: 5,
        marginTop: 5
    },
      caixa: {
        height: 300,
        width: "100%",
        // backgroundColor: "red",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center"
      },
    tinyLogo: {
        height: 100,
        width: "100%",
        marginTop: 15,
    },
});