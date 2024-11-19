import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ComentarioComp from './ComentarioComp';

export default function SalvarComent() {
    const [salvaComent, setSalvaComent] = useState([]);

    async function getComentario() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/GetAllComentarios', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                setSalvaComent(json);
            })

            .catch(err => console.log(err))
    }

    useEffect(()=>{
        getComentario()
    },[])


  return (
    <View>
      <FlatList
      data={salvaComent}
      renderItem={({item}) => <ComentarioComp usuario={item.usuarioNome} descricao={item.comentarioDescricao}/>}
      />
    </View>
  )
}

const css = StyleSheet.create({})