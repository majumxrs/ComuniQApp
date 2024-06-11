//BUSCA PRODUTOS DA API

import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Produto from '../Components/Produto';
import Stories from '../Components/Stories';
import Dethaless from '../Components/Detalhes';

export default function Home() {

  const [animais, setAnimais] = useState([]);
  const [detalhes, setDetalhes] = useState(false);
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
    console.log(id);
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


  //FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getAnimais();
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
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    // justifyContent: "center",
    alignItems: "center"
  },
  caixa:{
    height:95,
    width:"100%",
    backgroundColor:"#C7BB9D",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"   
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
    backgroundColor:"red"
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
    color:"white"
  },
})