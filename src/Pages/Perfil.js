import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import EditarPerfil from './EditarPerfil';
import { useFocusEffect } from '@react-navigation/native';

export default function Inserir({ navigation }) {
    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();
    const [apelido, setApelido] = useState();
    const [email, setEmail] = useState();
    const [telefone, setTelefone] = useState();
    const [CPF, setCpf] = useState();
    const [cep, setCep] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [foto, setFoto] = useState();
    const { setLogado, id, Login, setEditPerfil, editPerfil, cpf, GetCPF, fotoNova, user } = useContext(AuthContext);


    useEffect(() => {
        if (user) {
            setNome(user.usuarioNome);
            setSobrenome(user.usuarioSobrenome);
            setApelido(user.usuarioApelido);
            setEmail(user.usuarioEmail);
            setTelefone(user.usuarioTelefone);
            setCpf(user.usuarioCPF);
            setCep(user.usuarioCEP);
            setBairro(user.usuarioBairro);
            setCidade(user.usuarioCidade);
            setFoto(user.usuarioFoto);
        }
    }, [user]);


    if (editPerfil == true) {
        return (
            <EditarPerfil />
        )
    }

    return (
        <>
            <View style={css.caixa}>
                <Image
                    style={css.tinyLogo}
                    source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
                />
            </View >
            <View style={css.container}>
                <View style={css.foto}>
                    <Image style={css.fotousu} source={{ uri: "https://comuniq.s3.amazonaws.com/usuario_" + user.usuarioCPF + ".jpg?" + Math.random() }} />
                </View>
                <View style={css.parte1}>
                    <View style={css.campo1}>
                        <Text style={css.tit}>Nome</Text>
                        <Text>{nome}</Text>
                    </View>
                    <View style={css.campo2}>
                        <Text style={css.tit}>Sobrenome</Text>
                        <Text>{sobrenome}</Text>
                    </View>
                </View>
                <View style={css.campo3}>
                    <Text style={css.tit}>Apelido</Text>
                    <Text>{apelido}</Text>
                </View>
                <View style={css.campo3}>
                    <Text style={css.tit}>Email</Text>
                    <Text>{email}</Text>
                </View>
                <View style={css.parte1}>
                    <View style={css.campo4}>
                        <Text style={css.tit}>Telefone</Text>
                        <Text>{telefone}</Text>
                    </View>
                    <View style={css.campo5}>
                        <Text style={css.tit}>CPF</Text>
                        <Text>{CPF}</Text>
                    </View>
                </View>
                <View style={css.parte1}>
                    <View style={css.campo4}>
                        <Text style={css.tit}>CEP</Text>
                        <Text>{cep}</Text>
                    </View>
                    <View style={css.campo5}>
                        <Text style={css.tit}>Cidade</Text>
                        <Text>{cidade}</Text>
                    </View>
                </View>
                <View style={css.campo3}>
                    <Text style={css.tit}>Bairro</Text>
                    <Text>{bairro}</Text>
                </View>
                <TouchableOpacity style={css.btn} onPress={() => setEditPerfil(true)}>
                    <Text style={css.txtbtn}>Editar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btn}>
                    <Text style={css.txtbtn} onPress={() => setLogado(false)}>Sair da Conta</Text>
                </TouchableOpacity>
            </View>
        </>
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
    campo1: {
        borderColor: "#9C9898",
        borderBottomWidth: 1,
        width: '35%'
    },
    parte1: {
        display: "flex",
        flexDirection: "row",
    },
    campo2: {
        borderColor: "#9C9898",
        borderBottomWidth: 1,
        width: '35%',
        marginLeft: "10%"
    },
    campo3: {
        borderColor: "#9C9898",
        borderBottomWidth: 1,
        width: '80%'
    },
    campo4: {
        borderColor: "#9C9898",
        borderBottomWidth: 1,
        width: '25%'
    },
    campo5: {
        borderColor: "#9C9898",
        borderBottomWidth: 1,
        width: '45%',
        marginLeft: "10%"
    },
    tit: {
        marginTop: 20,
        marginBottom: 10,
        color: "grey"
    },
    foto: {
        width: 135,
        height: 135,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#9C9898",
        marginTop: 25,
        marginBottom: 10,
        objectFit: 'cover'
    },
    fotousu: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        borderRadius: 100,
    },
    btn: {
        backgroundColor: "#20343F",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        borderRadius: 10,
        height: 45,
        marginTop: 20
    },
    txtbtn: {
        color: "#fff",
        fontSize: 17
    }
})