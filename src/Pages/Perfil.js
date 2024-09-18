import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function Inserir() {
  const { setLogado } = useContext(AuthContext);
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
        />
      </View >
      <View>
        <Text>Foto</Text>
      </View>
      <View style={css.campo1}>
        <Text>Nome</Text>
        <Text>Jered Cleiton</Text>
      </View>
      <View style={css.campo1}>
        <Text>Sobrenome</Text>
        <Text>Da Silva</Text>
      </View>
      <View style={css.campo1}>
        <Text>Apelido</Text>
        <Text>Jered</Text>
      </View>
      <View style={css.campo1}>
        <Text>Email</Text>
        <Text>Jered.Cleiton@email.com</Text>
      </View>
      <View style={css.campo1}>
        <Text>Telefone</Text>
        <Text>99 999999999</Text>
      </View>
      <View style={css.campo1}>
        <Text>CPF</Text>
        <Text>44444444444</Text>
      </View>
      <View style={css.campo1}>
        <Text>CEP</Text>
        <Text>172800-000</Text>
      </View>
      <View style={css.campo1}>
        <Text>Cidade</Text>
        <Text>Pederneiras</Text>
      </View>
      <View style={css.campo1}>
        <Text>Bairro</Text>
        <Text>Aquele lá</Text>
      </View>
      <TouchableOpacity>
        <Text>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flexGrow: 1,
    color: "white",
    // justifyContent: "center",
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
    borderColor: "#000",
    borderBottomWidth: 1
  }
})