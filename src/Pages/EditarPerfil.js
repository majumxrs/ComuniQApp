import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function EditarPerfil() {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [apelido, setApelido] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [cpf, setCpf] = useState();
  const [cep, setCep] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [foto, setFoto] = useState();
 
  async function infoUsuario() {
    await fetch('http://10.139.75.25:5251/api/Usuarios/GetUsuarioId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        if (Login) {
          setNome(json.usuarioNome);
          setSobrenome(json.usuarioSobrenome);
          setApelido(json.usuarioApelido);
          setEmail(json.usuarioEmail);
          setTelefone(json.usuarioTelefone);
          setCpf(json.usuarioCPF);
          setCep(json.usuarioCEP);
          setBairro(json.usuarioBairro);
          setCidade(json.usuarioCidade);
          setFoto(json.usuarioFoto);
        }
      })
      .catch(err => console.log(err))
  }
  const conversorimg = () => {
    return `data:image/jpeg;base64,${foto}`
}

async function Salvar() {
  await fetch('http://10.139.75.25:5251/api/Usuarios/UpdateUsuario/' + id, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      usuarioNome: nome,
      usuarioSobrenome: sobrenome,
      usuarioApelido: apelido,
      usuarioEmail: email,
      usuarioTelefone: telefone,
      usuarioCPF: cpf,
      usuarioCEP: cep,
      usuarioBairro: bairro,
      usuarioCidade: cidade,
      usuarioFoto: "",
      tipoPerfilId: 1
  })
  })
    .then(res => res.json())
    .then(json => {
      console.log(json.usuarioNome)
      console.log("Perfil atualizado com sucesso:", json);
    })
    .catch(err => console.log("deu erro", err))
}

  useEffect(() => {
    infoUsuario()
  }, [])
  const { id, Login } = useContext(AuthContext);

  return (
    <>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
        />
      </View >
      <View style={css.container}>
        <TouchableOpacity style={css.foto}>
          <Image style={css.fotousu} source={{ uri: "https://comuniq.s3.amazonaws.com/" + foto  }} />
        </TouchableOpacity>
        <View style={css.parte1}>
          <View style={css.campo1}>
            <Text style={css.tit}>Nome</Text>
            <TextInput 
            onChangeText={(digitado) => setNome(digitado)}>{nome}</TextInput>
          </View>
          <View style={css.campo2}>
            <Text style={css.tit}>Sobrenome</Text>
            <TextInput onChangeText={(digitado) => setSobrenome(digitado)}>{sobrenome}</TextInput>
          </View>
        </View>
        <View style={css.campo3}>
          <Text style={css.tit}>Apelido</Text>
          <TextInput onChangeText={(digitado) => setApelido(digitado)}>{apelido}</TextInput>
        </View>
        <View style={css.campo3}>
          <Text style={css.tit}>Email</Text>
          <TextInput onChangeText={(digitado) => setEmail(digitado)}>{email}</TextInput>
        </View>
        <View style={css.parte1}>
          <View style={css.campo4}>
            <Text style={css.tit}>Telefone</Text>
            <TextInput onChangeText={(digitado) => setTelefone(digitado)}>{telefone}</TextInput>
          </View>
          <View style={css.campo5}>
            <Text style={css.tit}>CPF</Text>
            <TextInput onChangeText={(digitado) => setCpf(digitado)}>{cpf}</TextInput>
          </View>
        </View>
        <View style={css.parte1}>
          <View style={css.campo4}>
            <Text style={css.tit}>CEP</Text>
            <TextInput onChangeText={(digitado) => setCep(digitado)}>{cep}</TextInput>
          </View>
          <View style={css.campo5}>
            <Text style={css.tit}>Cidade</Text>
            <TextInput onChangeText={(digitado) => setCidade(digitado)}>{cidade}</TextInput>
          </View>
        </View>
        <View style={css.campo3}>
          <Text style={css.tit}>Bairro</Text>
          <TextInput onChangeText={(digitado) => setBairro(digitado)}>{bairro}</TextInput>
        </View>
        <TouchableOpacity onPress={Salvar} style={css.btn}>
          <Text style={css.txtbtn} >Salvar</Text>
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
  fotousu:{
    width:'100%',
    height:'100%',
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