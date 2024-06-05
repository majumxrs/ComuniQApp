//BUSCA PRODUTOS DA API

import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Produto from '../Components/Produto';
import Stories from '../Components/Stories';


export default function Home() {

  const [produtos, setProdutos] = useState([]);

//MINHA API 
  async function getProdutos() {
    await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

    //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
      .then(res => res.json())
      .then(json => setProdutos(json))
      .catch(err => console.log(err))
  }

//FILTRO PARA AO ENTRAR NA PAGINA EXEGUTAR O GETPRODUTROS(API)
  useEffect(() => {
    getProdutos();
  }, [])
  
//Item e um nome generico que vem da api que vc delimitou na data, podendo ser qualquer nome. dependendo para facilitar o entedimento pode colocar o memo nome do que vc vai buscar.
  return (
    <View style={css.container}>
      {produtos ?
        <>
          <Stories produtos={produtos} />
          <FlatList
            data={produtos}
            renderItem={({ item }) => <Produto title={item.title} price={item.price} image={item.image} description={item.description} category={item.category} rating={item.rating} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ height: (produtos.length * 600) + 110 }}
          />
        </>
        :
        <Text style={css.text}>Carregando produtos...</Text>
      }
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  stories: {
    width: "100%",
    height: 100
  }
})