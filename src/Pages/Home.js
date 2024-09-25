//BUSCA PRODUTOS DA API

import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Denuncia from "../Components/Denuncias";
import { AuthContext } from '../Context/AuthContext';


export default function Home({navigation}) {

  //Publicação
  const [detalhes, setDetalhes] = useState(true);

  const [BairroId, setBairroId] = useState(0);
  const [UsuarioId, setUsuarioId] = useState(0);

  //"Resposta"
  const [Resposta, setResposta] = useState(false)
  const [obs, setObs] = useState(false);

  //denuncia
  const [denuncia, setDenuncia] = useState([]);
  const [denunciaId, setDenunciaId] = useState(0);
  const [denunciaTitulo, setDenunciaTitulo] = useState([]);
  const [denunciaMidia, setDenunciaMidia] = useState("");
  const [denunciaDescricao, setDenunciaDescricao] = useState([]);
  const [tipoDenunciaId, setTipoDenunciaId] = useState(0);
  //BairroId Tambem tem!!

  //Usuarios ja tem 
  const [comentarioId, setComentarioId] = useState(0);


  //MINHA API 
  async function getCampanah() {
    await fetch('https://10.139.75.29:5280/api/Campanhas/GetAllCampanhas', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => setCampanha(json))
      .catch(err => console.log(err))
  }

  async function getCampanahId(id) {
    await fetch('https://10.139.75.29:5280/api/Campanhas/GetCampanhaId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => {
        setCampanhaId(json.campanhaId);
        setCampanhaTitulo(json.campanhaTitulo);
        setCampanhaMidia(json.campanhaMidia);
        setCampanhaDescricao(json.campanhaDescricao);
        setCidadeId(json.cidadeId);
        setTipoCampanhaId(json.tipoCampanhaId);

      })
      .catch(err => console.log(err))
  }

  async function getDenuncia() {
    await fetch('https://10.139.75.99:5280/api/Denuncia/GetAllDenuncias', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => {
        setDenunciaId(json.denunciaId);
        setDenunciaTitulo(json.denunciaTitulo);
        setDenunciaMidia(json.denunciaMidia);
        setDenunciaDescricao(json.denunciaDescricao);
        setTipoDenunciaId(json.tipoDenunciaId);
        setBairroId(json.bairroId);

      })
      .catch(err => console.log(err))
  }

  async function getDenunciaId(id) {
    await fetch('https://10.139.75.29:5280/api/Denuncia/GetDenunciaId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setobservacoes(json);
      })
      .catch(err => console.log(err))
  }

  async function GetComentarios() {
    await fetch('https://10.139.75.29:5280/GetAllComentarios ', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => setComentarios(json))
      .catch(err => console.log(err))
  }

  //FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getDenunciaId();
    getDenuncia();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getCampanah();
      getDenuncia();
      getDenunciaId();
    }, [])
  );

  //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
        />
      </View >

      <View style={css.containerDetalhes}>
        <View style={css.boxImage}>
          <Text>Teste</Text>
          <FlatList
            data={denuncia}
            renderItem={({ item }) => <Denuncia GetDenunciaId={getDenunciaId} getDenuncia={getDenuncia} denunciaId={item.denunciaId} denunciaTitulo={item.denunciaTitulo} denunciaMidia={item.denunciaMidia} tipoDenunciaId={item.tipoDenunciaId} bairroId={item.bairroId} denunciaDescricao={item.denunciaDescricao}/>}
            keyExtractor={(item) => item.denunciaId}
            contentContainerStyle={{ height: (denuncia.length * 600) + 200 }}
          />
          {/* {obs &&
                  <View style={css.PaiInput}>
                    <TextInput style={css.input} textInput={observacaoDescricao} value={observacaoDescricao} onChangeText={(digitado) => setObservacaoDescricao(digitado)} placeholder="Nova Descrição:" />
                    <TextInput style={css.input} textInput={observacaoLocal} value={observacaoLocal} onChangeText={(digitado) => setObservacaoLocal(digitado)} placeholder="Local de encontro:" />
                    <TextInput style={css.input} textInput={observacaoData} value={observacaoData} onChangeText={(digitado) => setObservacaoData(digitado)} placeholder="Data:" />
                    <TouchableOpacity style={css.btn02} onPress={() => SalvarObs()}>
                      <Text style={css.TextoBTNC}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                } */}
        </View>
      </View>
    </View>

  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    color: "white",
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    height: 30,
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
  text: {
    color: "black",
    lineHeight: 30,
    fontSize: 20,
    fontWeight: "bold"
  },
  boxImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginLeft: 90,
  },
  imagem: {
    minWidth: "100%",
    // width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 20
  },
  BTNVoltar: {
    fontSize: 25,
    marginRight: 380,
    color: "white"
  },
  btn02: {
    marginTop: 5,
    backgroundColor: "red",
    width: "90%",
    height: 50,
    borderRadius: 10,
    color: "white",
    marginLeft: 12
  },
  btn01: {
    marginTop: 15,
    backgroundColor: "red",
    width: "90%",
    height: 50,
    borderRadius: 10,
    color: "white",
    marginLeft: 22
  },
  TextoBTNC: {
    color: "black",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  PaiInput: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "red",
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom: 5,
    marginTop: 5
  },
  Flat: {
    marginTop: 10
  }
})