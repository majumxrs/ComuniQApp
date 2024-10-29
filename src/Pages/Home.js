import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Image, TextInput, image, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Denuncia from "../Components/Denuncias";
import { AuthContext } from '../Context/AuthContext';
import Campanhas from '../Components/Campanhas';
import Outros from '../Components/Outros';
import HomeCom from '../Components/HomeComp';


export default function Home({ navigation }) {

  //Publicação

  const [dados, setDados] = useState([]);
  const [publicacao, setPublicacao] = useState([]);
  const [campanha, setCampanha] = useState([]);
  const [denuncia, setDenuncia] = useState([]);

  const [PublicacaoTitulo, setPublicacaoTitulo] = useState([]);
  const [PublicacaoMidia, setPublicacaoMidia] = useState(null);
  const [PublicacaoDescricao, setPublicacaoDescricao] = useState([]);


  const [UsuarioId, setUsuarioId] = useState(0);

  //"Campanha"

  const [campanhaId, setCampanhaId] = useState([]);
  const [campanhaTitulo, setCampanhaTitulo] = useState([]);
  const [campanhaMidia, setCampanhaMidia] = useState(null);
  const [campanhaDescricao, setCampanhaDescricao] = useState([]);
  const [tipoCampanhaId, setTipoCampanhaId] = useState(0);
  const [cidadeId, setCidadeId] = useState(0);

  //denuncia

  const [comentario, setComentario] = useState([]);
  const [comentarioId, setComentarioId] = useState([]);
  const [comentarioTexto, setComentarioTexto] = useState([]);
  const [publicacaoId, setPublicacaoId] = useState(0);


  const [denunciaId, setDenunciaId] = useState([]);
  const [denunciaTitulo, setDenunciaTitulo] = useState([]);
  const [denunciaMidia, setDenunciaMidia] = useState(null);
  const [denunciaDescricao, setDenunciaDescricao] = useState([]);
  const [tipoDenunciaId, setTipoDenunciaId] = useState(0);
  const [BairroId, setBairroId] = useState(0);

  //Usuarios ja tem 

  const [denunciatro, setDenunciaTro] = useState(false);
  const [campanhas, setCampanhas] = useState(false);
  const [outros, setOutros] = useState(false);
  const [home, setHome] = useState(true);
  const [voltarD, setVoltarD] = useState(false)

  //MINHA API 
  async function getDenuncia() {
<<<<<<< HEAD
    await fetch('http://10.139.75.99:5251/api/Denuncia/GetAllDenuncias', {
=======
    await fetch( process.env.EXPO_PUBLIC_URL +  '/api/Denuncia/GetAllDenuncias', {
>>>>>>> 831c62e0ea71fea13323d0cb7777690a1ef74458
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

<<<<<<< HEAD
  async function getDenunciaId(id) {
    await fetch('http://10.139.75.99:5251/api/Denuncia/GetDenunciaId/' + id, {
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




  async function getCampanhas() {
    await fetch('http://10.139.75.99:5251/api/Campanhas/GetAllCampanhas', {
=======

  async function getCampanhas() {
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Campanhas/GetAllCampanhas', {
>>>>>>> 831c62e0ea71fea13323d0cb7777690a1ef74458
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setCampanha(json);
      })

      .catch(err => console.log(err))
  }

<<<<<<< HEAD
  async function getCampanhaId(id) {
    await fetch('http://10.139.75.99:5251/api/Campanhas/GetCampanhaId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setCampanhaId(json.campanhaId);
        setCampanhaTitulo(json.campanhaTitulo);
        setCampanhaMidia(json.campanhaMidia);
        setCampanhaDescricao(json.campanhaDescricao);
        setTipoCampanhaId(json.tipoCampanhaId);
        setCidadeId(json.cidadeId);
      })
      .catch(err => console.log(err))
  }


  async function getPublicacao() {
    await fetch('http://10.139.75.99:5251/api/Publicacoes/GetAllPublicacoes', {
=======
  async function getPublicacao() {
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Publicacoes/GetAllPublicacoes', {
>>>>>>> 831c62e0ea71fea13323d0cb7777690a1ef74458
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setPublicacao(json);
      })

      .catch(err => console.log(err))
  }
<<<<<<< HEAD

  async function getPublicacaoId(id) {
    await fetch('http://10.139.75.99:5251/api/Publicacoes/GetPublicacaoId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setPublicacaoId(json.publicacaoId);
        setPublicacaoTitulo(json.publicacaoTitulo);
        setPublicacaoMidia(json.publicacaoMidia);
        setPublicacaoDescricao(json.publicacaoDescricao);
        setBairroId(json.bairroId);
      })
      .catch(err => console.log(err))
  }
=======
  
  
>>>>>>> 831c62e0ea71fea13323d0cb7777690a1ef74458


  function getAll() {
    getCampanhas();
    getDenuncia();
    getPublicacao();
    setDados([...campanha, ...publicacao, ...denuncia ]);
  }

  useFocusEffect(
    React.useCallback(() => {
      getAll();
    }, [])
  );

  //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <TouchableOpacity style={css.btnLogo} onPress={() => { getAll() }}>
          <Image style={css.tinyLogo} source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} />
        </TouchableOpacity>
      </View >
      
      <View style={css.CaixaPai3bnt}>
        <View style={css.btnOutros}>
          <TouchableOpacity style={css.btnOutros}
            onPress={() => { getPublicacao(); setDados( publicacao ); }}
          >
            <Text style={css.Texto}>Outros</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={css.btnCamp}
            onPress={() => { getCampanhas(); setDados( campanha ); }}
          >
            <Text style={css.Texto}>Campanhas</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={css.btnDenun}
            onPress={() => { getDenuncia(); setDados( denuncia ); }}
          >
            <Text style={css.Texto}>Denuncia</Text>
          </TouchableOpacity>
        </View>
      </View>
      {dados &&
        <View style={css.Teste}>
          <FlatList
            data={dados}
            renderItem={({ item, index }) =>
              <HomeCom
                item={item}
              />
            }
            keyExtractor={(item, index) => index}
            contentContainerStyle={{ paddingBottom: dados.length * 10 }}
          />
        </View>
      }
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
    height: 100,
    width: "100%",
    backgroundColor: "#20343F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  tinyLogo: {
    width: '100%',
    height: '100%'
  },
  btnLogo: {
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
  CaixaPai3bnt: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnOutros: {
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#20343F",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginRight: 10,
    marginLeft: 10,
  },
  btnCamp: {
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#20343F",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginRight: 10
  },
  btnDenun: {
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#20343F",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginRight: 10
  },
  Texto: {
    fontSize: 22,
    fontWeight: "400",
    color: "white"
  },
  Teste: {
    height: 620,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})