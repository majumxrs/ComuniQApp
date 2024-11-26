import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import TelaCamera from '../Components/Camera';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function EditarPerfil() {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [apelido, setApelido] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [CPF, setCpf] = useState();
  const [cep, setCep] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [senha, setSenha] = useState();

  const [foto, setFoto] = useState();
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState();

  const { id, Login, novaFoto, setNovaFoto, setCamera, setGaleria, camera, SetUser, setEditPerfil, user } = useContext(AuthContext);





  async function Salvar() {
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Usuarios/UpdateUsuario/' + id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        usuarioId: id,
        usuarioNome: nome,
        usuarioSobrenome: sobrenome,
        usuarioApelido: apelido,
        usuarioEmail: email,
        usuarioTelefone: telefone,
        usuarioCPF: CPF,
        usuarioCEP: cep,
        usuarioBairro: bairro,
        usuarioCidade: cidade,
        usuarioFoto: "usuario_" + user.usuarioCPF + ".jpg",
        usuarioEstado: estado,
        usuarioSenha: senha,
        tipoPerfilId: 1
      })
    })
      .then(res => res.json())
      .then(json => {
        alert("Perfil atualizado com sucesso");
        setEditPerfil(false);
        SetUser(json);

      })
      .catch(err => alert(err))
  }

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
      setEstado(user.usuarioEstado);
      setSenha(user.usuarioSenha);
    }
  }, [user])


  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setBlob(blob);
    }
  };

  async function uploadPhoto() {
    const S3 = new AWS.S3();
    const object = {
      Bucket: "comuniq",
      Key: "usuario_" + user.usuarioCPF + ".jpg"
    };

    const excluir = await S3.deleteObject(object).promise();
    const params = {
      Bucket: "comuniq",
      Key: "usuario_" + user.usuarioCPF + ".jpg",
      Body: blob
    };
    const result = await S3.upload(params).promise();
    if (result) {
      setBlob(false);
    }
  }


  useEffect(() => {
    if (blob) {
      uploadPhoto();
    }
  }, [blob])

  if (camera == true) {
    return (
      <TelaCamera />
    )
  }

  return (
    <View>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
        />
      </View >
      <ScrollView style={css.scroll}>
        <TouchableOpacity style={css.btnV} onPress={() => setEditPerfil(false)}>
          <Text style={css.btnLoginTextV}>&#9664;</Text>
        </TouchableOpacity>

        <View style={css.container}>
          <TouchableOpacity style={css.foto} onPress={() => setNovaFoto(true)}>
            <Image style={css.fotousu} source={{ uri: "https://comuniq.s3.amazonaws.com/usuario_" + user.usuarioCPF + ".jpg?" + Math.random() }} />
          </TouchableOpacity>
          {novaFoto &&
            <Modal
              animationType="slide"
              transparent={true}>
              <View style={css.popup}>
                <TouchableOpacity style={css.btnpop} onPress={() => setCamera(true)}>
                  <Text style={css.txtpop}>Câmera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnpop} onPress={pickImage}>
                  <Text style={css.txtpop}>Procurar foto existente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnpop} onPress={() => setNovaFoto(false)}>
                  <Text style={css.txtpop}>Fechar</Text>
                </TouchableOpacity>
                {image && setNovaFoto(false)}
              </View>
            </Modal>}
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
              <TextInput onChangeText={(digitado) => setCpf(digitado)}>{CPF}</TextInput>
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
      </ScrollView>
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
    height: "13%",
    width: "100%",
    backgroundColor: "#20343F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  tinyLogo: {
    height: 60,
    width: "25%",
    marginTop:20
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
  },
  image: {
    width: 200,
    height: 200,
  },
  popup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20343F',
    borderRadius: 20,
    width: '80%',
    padding: 20,
    margin: 'auto',
  },
  txtpop: {
    color: "#fff",
    padding: 8
  },
  btnLoginTextV: {
    color: "gray",
    fontSize: 25,
  },
  btnV: {
    backgroundColor: "#fff"
  },
  scroll:{
    height: '87%'
  }
})