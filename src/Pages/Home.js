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
  const [publicacao, setPublicacao] = useState([]);
  const [PublicacaoTitulo, setPublicacaoTitulo] = useState([]);
  const [PublicacaoMidia, setPublicacaoMidia] = useState(null);
  const [PublicacaoDescricao, setPublicacaoDescricao] = useState([]);


  const [UsuarioId, setUsuarioId] = useState(0);

  //"Campanha"
  const [campanha, setCampanha] = useState([]);
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

  const [denuncia, setDenuncia] = useState([]);
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

  //MINHA API 
  async function getDenuncia() {
    await fetch('http://10.139.75.22:5251/api/Denuncia/GetAllDenuncias', {
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
    await fetch('http://10.139.75.22:5251/api/Denuncia/GetDenunciaId/' + id, {
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
    await fetch('http://10.139.75.22:5251/api/Campanhas/GetAllCampanhas', {
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

  async function getCampanhaId(id) {
    await fetch('http://10.139.75.22:5251/api/Campanhas/GetCampanhaId/' + id, {
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
    await fetch('http://10.139.75.22:5251/api/Publicacoes/GetAllPublicacoes', {
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

  async function getPublicacaoId(id) {
    await fetch('http://10.139.75.22:5251/api/Publicacoes/GetPublicacaoId/' + id, {
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



  //FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getDenunciaId();
    getDenuncia();
    getCampanhas();
    getCampanhaId();
    getPublicacao();
    getPublicacaoId();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getDenuncia();
      getDenunciaId();
      getCampanhas();
      getCampanhaId();
      getPublicacao();
      getPublicacaoId();
    }, [])
  );

  //Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <TouchableOpacity style={css.btnLogo} onPress={() => { setHome(true) }}>
          <Image style={css.tinyLogo} source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} />
        </TouchableOpacity>
      </View >
      <View style={css.CaixaPai3bnt}>
        <View style={css.btnOutros}>
          <TouchableOpacity style={css.btnOutros}
            onPress={() => {
              setOutros(true),
                setCampanhas(false),
                setDenunciaTro(false),
                setHome(false)
            }}
          >
            <Text style={css.Texto}>Outros</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={css.btnCamp}
            onPress={() => {
              setOutros(true),
                setCampanhas(true),
                setDenunciaTro(false),
                setHome(false)
            }}
          >
            <Text style={css.Texto}>Campanhas</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={css.btnDenun}
            onPress={() => {
              setOutros(true),
                setCampanhas(false),
                setDenunciaTro(true),
                setHome(false)
            }}
          >
            <Text style={css.Texto}>Denuncia</Text>
          </TouchableOpacity>
        </View>
      </View>
      {home ?
        <>
          <View style={css.Teste}>
            <FlatList
              data={denuncia}
              renderItem={({ item }) =>
                <HomeCom
                  GetDenunciaId={getDenunciaId}
                  getDenuncia={getDenuncia}
                  denunciaTitulo={item.denunciaTitulo}
                  denunciaMidia={item.denunciaMidia}
                  tipoDenunciaId={item.tipoDenunciaId}
                  bairroId={item.bairroId}
                  denunciaDescricao={item.denunciaDescricao}
                  /*Campanha*/
                  getCampanhas={getCampanhas}
                  getCampanhaId={getCampanhaId}
                  campanhaTitulo={item.campanhaTitulo}
                  campanhaMidia={item.campanhaMidia}
                  campanhaDescricao={item.campanhaDescricao}
                  tipoCampanhaId={item.tipoCampanhaId}
                  cidadeId={item.cidadeId}
                  /**/
                  getPublicacao={getPublicacao}
                  getPublicacaoId={getPublicacaoId}
                  publicacaoTitulo={item.publicacaoTitulo}
                  publicacaoMidia={item.publicacaoMidia}
                  publicacaoDescricao={item.publicacaoDescricao}
                />
              }
              keyExtractor={(item) => item.denunciaId}
              contentContainerStyle={{ height: (denuncia.length * 800) + 500 }}
            />
          </View>
        </>

        :

        <>
          {denunciatro ?
            <>
                  <View style={css.Teste}>
                    <FlatList
                      data={denuncia}
                      renderItem={({ item }) =>
                        <Denuncia
                          GetDenunciaId={getDenunciaId}
                          getDenuncia={getDenuncia}
                          denunciaTitulo={item.denunciaTitulo}
                          denunciaMidia={item.denunciaMidia}
                          tipoDenunciaId={item.tipoDenunciaId}
                          bairroId={item.bairroId}
                          denunciaDescricao={item.denunciaDescricao}
                        />
                      }
                      keyExtractor={(item) => item.denunciaId}
                      contentContainerStyle={{ height: (denuncia.length * 800) + 500 }}
                    />
                  </View>
            </>
            :
            <>
              {campanhas ?
                <>
                      <View style={css.Teste}>
                        <FlatList
                          data={campanha}
                          renderItem={({ item }) =>
                            <Campanhas
                              getCampanhas={getCampanhas}
                              getCampanhaId={getCampanhaId}
                              campanhaTitulo={item.campanhaTitulo}
                              campanhaMidia={item.campanhaMidia}
                              campanhaDescricao={item.campanhaDescricao}
                              tipoCampanhaId={item.tipoCampanhaId}
                              cidadeId={item.cidadeId}
                            />
                          }
                          keyExtractor={(item) => item.campanhaId}
                          contentContainerStyle={{ height: (denuncia.length * 800) + 500 }}
                        />
                      </View>

                </>

                :
                <>
                    <View style={css.Teste}>
                      <FlatList
                        data={publicacao}
                        renderItem={({ item }) => <Outros
                          getPublicacao={getPublicacao}
                          getPublicacaoId={getPublicacaoId}
                          publicacaoTitulo={item.publicacaoTitulo}
                          publicacaoMidia={item.publicacaoMidia}
                          publicacaoDescricao={item.publicacaoDescricao}
                          bairroId={item.bairroId}
                        />
                        }
                        keyExtractor={(item) => item.publicacaoId}
                        contentContainerStyle={{ height: (publicacao.length * 800) + 500 }}
                      />
                    </View>
                </>}
            </>}
        </>}


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