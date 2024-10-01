//BUSCA PRODUTOS DA API

import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Denuncia from "../Components/Denuncias";
import { AuthContext } from '../Context/AuthContext';
import Campanhas from '../Components/Campanha';
import Outros from '../Components/Outros';
import Teste from '../Components/Teste';


export default function Home({ navigation }) {

  //Publicação

  const [UsuarioId, setUsuarioId] = useState(0);

  //"Resposta"


  //denuncia

  const [denuncia, setDenuncia] = useState([]);
  const [denunciaId, setDenunciaId] = useState([]);
  const [denunciaTitulo, setDenunciaTitulo] = useState([]);
  const [denunciaMidia, setDenunciaMidia] = useState("");
  const [denunciaDescricao, setDenunciaDescricao] = useState([]);
  const [tipoDenunciaId, setTipoDenunciaId] = useState(0);
  const [BairroId, setBairroId] = useState(0);
  //BairroId Tambem tem!!

  //Usuarios ja tem 

  const [denunciatro, setDenunciaTro] = useState(true);
  const [campanhas, setCampanhas] = useState(false);
  const [outros, setOutros] = useState(false);
  const [teste, setTeste] = useState(false);

  //MINHA API 
  async function getDenuncia() {
    await fetch('http://10.139.75.99:5280/api/Denuncia/GetAllDenuncias', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setDenuncia(json);
      })

      .catch(err => console.log(err))
  }

  async function getDenunciaId(id) {
    await fetch('http://10.139.75.99:5280/api/Denuncia/GetDenunciaId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
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

  //FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getDenunciaId();
    getDenuncia();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getDenuncia();
      getDenunciaId();
    }, [])
  );
  // const [denunciatro, setDenunciaTro] = useState(false);
  // const [campanhas, setCampanhas] = useState(false);
  // const [outros, setOutros] = useState(false);
  // const [teste, setTeste] = useState(false);

  // if (campanhas) {
  //   return (<Campanhas setCampanhas={setCampanhas} setDenunciaTro={setDenunciaTro} setOutros={setOutros} />)
  // }
  // if (outros) {
  //   return (<Outros setCampanhas={setCampanhas} setDenunciaTro={setDenunciaTro} setOutros={setOutros} />)
  // }
  // if (denunciatro) {
  //   return (<Denuncia setCampanhas={setCampanhas} setDenunciaTro={setDenunciaTro} setOutros={setOutros} />)
  // }
  // if (teste) {
  //   return (<Teste setTeste={setTeste} setCampanhas={setCampanhas} setDenunciaTro={setDenunciaTro} setOutros={setOutros} />)
  // }

  //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <Image style={css.tinyLogo} source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} />
      </View >
      {denunciatro ?
        <>
          <View style={css.containerDetalhes}>
            <View style={css.boxImage}>

              <View>
                <TouchableOpacity style={css.btn} onPress={() => { setOutros(true) }}>
                  <Text style={css.Texto}>Denuncia</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={css.btn} onPress={() => { setCampanhas(true) }}>
                  <Text style={css.Texto}>Campanhas</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={css.btn} onPress={() => { setDenunciaTro(true) }}>
                  <Text style={css.Texto}>Denuncia</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={css.btn} onPress={() => { setTeste(true) }}>
                  <Text style={css.Texto}>Teste</Text>
                </TouchableOpacity>
              </View>
              <View style={css.Teste}>
                <FlatList
                  data={denuncia}
                  renderItem={({ item }) => <Denuncia GetDenunciaId={getDenunciaId} getDenuncia={getDenuncia} denunciaTitulo={item.denunciaTitulo} denunciaMidia={item.denunciaMidia} tipoDenunciaId={item.tipoDenunciaId} bairroId={item.bairroId} denunciaDescricao={item.denunciaDescricao} />}
                  keyExtractor={(item) => item.denunciaId}
                  contentContainerStyle={{ height: (denuncia.length * 800) + 500 }}
                />
              </View>
            </View>
          </View>
        </>
        :
        <>
          <View>
            <View>
              <TouchableOpacity style={css.btn} onPress={() => { setOutros(true) }}>
                <Text style={css.Texto}>Denuncia</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={css.btn} onPress={() => { setCampanhas(true) }}>
                <Text style={css.Texto}>Campanhas</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={css.btn} onPress={() => { setDenunciaTro(true) }}>
                <Text style={css.Texto}>Denuncia</Text>
              </TouchableOpacity>
            </View>

            <View style={css.Teste}>
              <FlatList
                data={denuncia}
                renderItem={({ item }) => <Denuncia GetDenunciaId={getDenunciaId} getDenuncia={getDenuncia} denunciaTitulo={item.denunciaTitulo} denunciaMidia={item.denunciaMidia} tipoDenunciaId={item.tipoDenunciaId} bairroId={item.bairroId} denunciaDescricao={item.denunciaDescricao} />}
                keyExtractor={(item) => item.denunciaId}
                contentContainerStyle={{ height: (denuncia.length * 800) + 500 }}
              />
            </View>

          </View>
        </>}

    </View>

  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    color: "white",
    width: "100%",
    //justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  Teste: {
    backgroundColor: "blue",
    height: 550,
    width: 370,
    marginLeft: -126,
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
  },
  btn: {
    width: 150,
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
})