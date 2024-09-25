import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function Inserir() {
  const { setLogado } = useContext(AuthContext);
  return (
    <>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
        />
      </View >
      <View style={css.container}>
        <View style={css.foto}>
          <Text>Foto</Text>
        </View>
        <View style={css.parte1}>
          <View style={css.campo1}>
            <Text style={css.tit}>Nome</Text>
            <Text>Jered Cleiton</Text>
          </View>
          <View style={css.campo2}>
            <Text style={css.tit}>Sobrenome</Text>
            <Text>Da Silva</Text>
          </View>
        </View>
        <View style={css.campo3}>
          <Text style={css.tit}>Apelido</Text>
          <Text>Jered</Text>
        </View>
        <View style={css.campo3}>
          <Text style={css.tit}>Email</Text>
          <Text>Jered.Cleiton@email.com</Text>
        </View>
        <View style={css.parte1}>
          <View style={css.campo4}>
            <Text style={css.tit}>Telefone</Text>
            <Text>99 999999999</Text>
          </View>
          <View style={css.campo5}>
            <Text style={css.tit}>CPF</Text>
            <Text>44444444444</Text>
          </View>
        </View>
        <View style={css.parte1}>
          <View style={css.campo4}>
            <Text style={css.tit}>CEP</Text>
            <Text>172800-000</Text>
          </View>
          <View style={css.campo5}>
            <Text style={css.tit}>Cidade</Text>
            <Text>Pederneiras</Text>
          </View>
        </View>
        <View style={css.campo3}>
          <Text style={css.tit}>Bairro</Text>
          <Text>Aquele lá</Text>
        </View>
        <TouchableOpacity style={css.btn}>
          <Text style={css.txtbtn}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={css.btn}>
          <Text style={css.txtbtn}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </>
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
  campo4:{
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
  tit:{ 
    marginTop: 20,
    marginBottom: 10,
    color: "grey"
  },
  foto:{
    width: 135,
    height: 135,
    borderRadius: 100,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#9C9898",
    marginTop: 25,
    marginBottom: 10
  },
  btn:{
    backgroundColor: "#20343F",
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    width:"80%",
    borderRadius: 10,
    height: 45,
    marginTop: 20
  },
  txtbtn:{
    color:"#fff",
    fontSize: 17
  }
})