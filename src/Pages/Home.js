//BUSCA PRODUTOS DA API

import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
// import Produto from '../Components/Produto';
import { AuthContext } from '../Context/AuthContext';


export default function Home() {

  const [animais, setAnimais] = useState([]);
  const [detalhes, setDetalhes] = useState(false);
  const [nomeAnimal, setNomeAnimal] = useState("");
  const [imgAnimal, setImgAnimal] = useState();
  const [idAnimal, setIdAnimal] = useState(0);
  const [racaAnimal, setRacaAnimal] = useState("");
  const [animalTipo, setAnimalTipo] = useState("");
  const [animalCor, setAnimalCor] = useState("");
  const [animalSexo, setAnimalSexo] = useState("");
  const [animalObservacao, setAnimalObservacao] = useState("");
  const [animalDataDesaparecimento, setAnimalDataDesaparecimento] = useState("");
  const [animalDataEncontro, setAnimalDataEncontro] = useState("");
  const [animalStatus, setAnimalStatus] = useState("");
  const [usuarioId, setUsuarioId] = useState(0);
  const [observacaoDescricao, setObservacaoDescricao] = useState("");
  const [observacaoLocal, setObservacaoLocal] = useState("");
  const [observacaoData, setObservacaoData] = useState("");
  const [Resposta, setResposta] = useState(false)
  const [criarAnimal, setCrearAnimal] = useState(false);
  const [obs, setObs] = useState(false);

  //MINHA API 
  async function getAnimais() {
    await fetch('http://10.139.75.19:5251/api/Animais/GetAllAnimal', {
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
    await fetch('http://10.139.75.19:5251/api/Animais/GetAnimalId/' + id, {
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
        setUsuarioId(json.usuarioId);
        setRacaAnimal(json.animalRaca);
        setAnimalTipo(json.animalTipo);
        setAnimalCor(json.animalCor);
        setAnimalSexo(json.animalSexo);
        setAnimalStatus(json.animalStatus);
        setAnimalObservacao(json.animalObservacao);
        setAnimalDataDesaparecimento(json.animalDataDesaparecimento);
        setAnimalDataEncontro(json.animalDataEncontro);
      })
      .catch(err => console.log(err))
  }

  async function getAnimaiss() {
    await fetch('http://10.139.75.19:5251/api/Animais/CreateAnimal', {
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
      .then(json => setCrearAnimal(false))
      .catch(err => console.log(err))
  }

  async function SalvarObs() {
    await fetch('http://10.139.75.19:5251/api/Observacoes/CreateObservacao ', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        observacaoDescricao: observacaoDescricao,
        observacaoLocal: observacaoLocal,
        observacaoData: observacaoData,
        animaisId: idAnimal,
        usuarioId: usuarioId,
      })
    })
      //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

  //FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getAnimais();
    getAnimaiss();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getAnimais();
    }, [])
  );

  //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <>
    <View style={css.container}>
      {detalhes ?
     <>
      <View style={css.caixa}>
      <Image
        style={css.tinyLogo}
        source={require("../../assets/LogoAppAchôCerta.png")}
      />
    </View >
        <SafeAreaView style={css.container}>
          <ScrollView>
            <View style={css.containerDetalhes}>
              <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setDetalhes(false), setObs(false) }}>❮</Text>
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
               
                {
                  animalStatus == 0 ?
                   <Text style={css.text}>Desaparecido</Text>
                   :  <Text style={css.text}>Encontrado</Text>
                }
                <Text style={css.text}>Data Desaparecimento: {animalDataDesaparecimento}</Text>
                <Text style={css.text}>Data encontro: {animalDataEncontro}</Text>                
                <TouchableOpacity style={css.btn01} onPress={() => setObs(true)}>
                  <Text style={css.TextoBTNC}>Nova Observação</Text>
                </TouchableOpacity>
                {obs &&
                  <View style={css.PaiInput}>
                    <TextInput style={css.input} textInput={observacaoDescricao} value={observacaoDescricao} onChangeText={(digitado) => setObservacaoDescricao(digitado)} placeholder="Nova Descrição:" />
                    <TextInput style={css.input} textInput={observacaoLocal} value={observacaoLocal} onChangeText={(digitado) => setObservacaoLocal(digitado)} placeholder="Local de encontro:" />
                    <TextInput style={css.input} textInput={observacaoData} value={observacaoData} onChangeText={(digitado) => setObservacaoData(digitado)} placeholder="Data:" />
                    <TouchableOpacity style={css.btn02} onPress={() => SalvarObs()}>
                      <Text style={css.TextoBTNC}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        </>
        :
        <>
          <View style={css.caixa}>
            <Image
              style={css.tinyLogo}
              source={require("../../assets/LogoAppAchôCerta.png")}
            />
          </View >
          <FlatList
            data={animais}
            style={css.Flat}
            renderItem={({ item }) => <Produto
              title={item.animalNome}
              image={item.animalFoto}
              setDetalhes={() => { setDetalhes(true); getAnimal(item.animaisId) }}
            />}
            keyExtractor={(item) => item.animaisId}
            contentContainerStyle={{ height: (animais.length * 600) + 110 }}
          />
        </>

      }
    </View>
    </>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#E6DACA",
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
    backgroundColor: "#C7BB9D",
    width: "90%",
    height: 50,
    borderRadius: 10,
    color: "white",
    marginLeft: 12
  },
  btn01: {
    marginTop: 15,
    backgroundColor: "#C7BB9D",
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
    borderColor: "#C9994D",
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