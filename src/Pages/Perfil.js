import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function Inserir() {
  const { setLogado } = useContext(AuthContext);
  return (
    <View style={css.container}>
      <View style={css.caixa}>
        <Image
          style={css.tinyLogo}
          source={require("../../assets/LogoAppAchôCerta.png")}
        />
      </View >
      <View style={css.caixa2}>
        <Text style={css.text}>Perfil</Text>
        <Button onPress={() => setLogado(false)} title='Sair'></Button>
      </View>
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#E6DACA",
    flexGrow: 1,
    color: "white",
    // justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white"
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
})