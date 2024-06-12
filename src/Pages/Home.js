//BUSCA PRODUTOS DA API

import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Produto from '../Components/Produto';
import { AuthContext } from '../Context/AuthContext';


export default function Home() {

  const [animais, setAnimais] = useState([]);
  const [detalhes, setDetalhes] = useState(false);
  const { novaObservacao, setNovaObservacao } = useContext(AuthContext);
  const [nomeAnimal, setNomeAnimal] = useState("");
  const [imgAnimal, setImgAnimal] = useState();
  const [idAnimal, setIdAnimal] = useState("");
  const [racaAnimal, setRacaAnimal] = useState("");
  const [animalTipo, setAnimalTipo] = useState("");
  const [animalCor, setAnimalCor] = useState("");
  const [animalSexo, setAnimalSexo] = useState("");
  const [animalObservacao, setAnimalObservacao] = useState("");
  const [animalDataDesaparecimento, setAnimalDataDesaparecimento] = useState("");
  const [animalDataEncontro, setAnimalDataEncontro] = useState("");
  const [animalStatus, setAnimalStatus] = useState("");
  const [usuariId, setUsuarioId] = useState("");
  const [observacaoDescricao, setObservacaoDescricao] = useState("");
  const [observacaoLocal, setObservacaoLocal] = useState("");
  const [observacaoData, setObservacaoData] = useState("");
  const [ Resposta, setResposta ] = useState(false)


  //MINHA API 
  async function getAnimais() {
    await fetch('http://10.139.75.9:5251/api/Animais/GetAllAnimal', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => setAnimais(json))
      .catch(err => console.log(err))
  }

  async function getAnimal(id) {
    await fetch('http://10.139.75.9:5251/api/Animais/GetAnimalId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => {
        setNomeAnimal(json.animalNome);
        setImgAnimal(json.animalFoto);
        setIdAnimal(json.animaisId);
        setRacaAnimal(json.animalRaca);
        setAnimalTipo(json.animalTipo);
        setAnimalCor(json.animalCor);
        setAnimalSexo(json.animalSexo);
        setAnimalObservacao(json.animalObservacao);
        setAnimalDataDesaparecimento(json.animalDataDesaparecimento);
        setAnimalDataEncontro(json.animalDataEncontro);
      })
      .catch(err => console.log(err))
  }

  async function getAnimaiss() {
    await fetch('http://10.139.75.9:5251/api/Animais/CreateAnimal', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        observacaoDescricao: "string",
        observacaoLocal: "string",
        observacaoData: "2024-06-12T15:01:27.669Z",
        animaisId: 0,
        usuarioId: 0
      })
    })

      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => console.log())
      .catch(err => console.log(err))
  }

  async function getAnimaisss() {
    await fetch('http://10.139.75.9:5251/api/Observacoes/CreateObservacao ', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        observacaoDescricao: "string",
        observacaoLocal: "string",
        observacaoData: "2024-06-12T15:01:27.669Z",
        animaisId: 0,
        usuarioId: 0
      })
    })

      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => setResposta(false))
      .catch(err => console.log(err))
  }

  //FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getAnimais();
    getAnimaiss();
    getAnimaisss();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getAnimais();
    }, [])
  );

  //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/LogoAppAchôCerta.png")}
        />
      </View >
      {/* <SafeAreaView>
        <ScrollView> */}
      {detalhes ?
        <View style={css.containerDetalhes}>
          <TouchableOpacity>
            <Text style={css.BTNVoltar} onPress={() => setDetalhes(false)}>❮</Text>
          </TouchableOpacity>
          <View style={css.boxImage}>
            <Image source={{ uri: imgAnimal }} style={css.imagem} />
          </View>
          <View style={css.boxTitle}>
            <Text style={css.text}>{nomeAnimal}</Text>
          </View>
          <View>
            <Text style={css.text}>Raça: {racaAnimal}</Text>
            <Text style={css.text}>Tipo: {animalTipo}</Text>
            <Text style={css.text}>Cor: {animalCor}</Text>
            <Text style={css.text}>Sexo: {animalSexo}</Text>
            <Text style={css.text}>Observação: {animalObservacao}</Text>
            <Text style={css.text}>Data Desaparecimento: {animalDataDesaparecimento}</Text>
            <Text style={css.text}>Data encontro: {animalDataEncontro}</Text>
            <TouchableOpacity style={css.btn02} onPress={() => setNovaObservacao(true)}>
              <Text style={css.TextoBTNC}>Nova Observação</Text>
            </TouchableOpacity>
            {novaObservacao &&
              <View style={css.PaiInput}>
                <TextInput style={css.input} textInput={observacaoDescricao} value={observacaoDescricao} onChangeText={(digitado) => setObservacaoDescricao(digitado)} placeholder="Nova Descrição:" />
                <TextInput style={css.input} textInput={observacaoLocal} value={observacaoLocal} onChangeText={(digitado) => setObservacaoLocal(digitado)} placeholder="Local de encontro:" />
                <TextInput style={css.input} textInput={observacaoData} value={observacaoData} onChangeText={(digitado) => setObservacaoData(digitado)} placeholder="Data:" />
                <TouchableOpacity style={css.btn02} onPress={() => setResposta(false)}>
                  <Text style={css.TextoBTNC}>Nova Observação</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
        :
        <FlatList
          data={animais}
          renderItem={({ item }) => <Produto
            title={item.animalNome}
            image={item.animalFoto}
            setDetalhes={() => { setDetalhes(true); getAnimal(item.animaisId) }}
          />}
          keyExtractor={(item) => item.animaisId}
          contentContainerStyle={{ height: (animais.length * 600) + 110 }}
        />
      }
      {/* </ScrollView>
      </SafeAreaView> */}
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#E6DACA",
    flexGrow: 1,
    color: "white",
    // justifyContent: "center",
    alignItems: "center"
  },
  caixa: {
    height: 95,
    width: "100%",
    backgroundColor: "#C7BB9D",
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
    color: "white"
  },
  boxImage: {
    width: 200,
    height: 200,
    backgroundColor: "red"
  },
  imagem: {
    minWidth: "100%",
    // width: "100%",
    height: 200,
    resizeMode: "contain"
  },
  BTNVoltar: {
    fontSize: 25,
    marginRight: 380,
    color: "white"
  },
  btn02: {
    marginTop: 15,
    marginLeft: 25,
    backgroundColor: "#13293D",
    width: "90%",
    height: "10%",
    borderRadius: 10,
  },
  PaiInput: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    margin: 20,
    borderColor: "#C9994D",
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
    backgroundColor: "white",
    marginTop: 10
  },
})