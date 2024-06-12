import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import Cadastro from '../Components/Cadastro';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { Login, error } = useContext(AuthContext);

    function RealizaLogin() {
        Login(email, senha);
    }


    return (
        <ScrollView contentContainerStyle={css.container}>
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
                    <TouchableOpacity onPress={Cadastro}>
                        <Text style={css.forgotText}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                <Text style={css.btnLoginText}>ENTRAR</Text>
            </TouchableOpacity>
            {error &&
                <View style={css.error}>
                    <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
                </View>
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
    ViewCadastrar:{
       display:"flex",
       flexDirection:"row" 
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
    }
});