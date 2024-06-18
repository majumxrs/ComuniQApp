
import { Image, StyleSheet, Text, View, } from 'react-native'
import React, { useState } from 'react'

export default function Cadastro() {
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ tel, setTel ] = useState("");
    const [ nome, setNome ] = useState("");

    return (
        <View style={css.CaixaTotal}>   
            <View style={css.caixa}>
                <Image
                    style={css.tinyLogo}
                    source={require("../../assets/LogoAppAchôCerta.png")}
                 />
            </View>  
                <SafeAreaView>
                    <ScrollView> 
                        <TouchableOpacity>
                            <Text style={css.BTNVoltar} onPress={ () => setCadastro( false )}>❮</Text> 
                        </TouchableOpacity> 
                        <View style={css.PaiCadastrar}>
                            <Text style={css.nomePag}>Cadastrar-se</Text>
                        </View>
                        {/* <View style={css.PaiImagens}>
                            <Image source={require('../../assets/FotosAchô/FacebookPreto.png')} style={css.Face}/>
                            <Image source={require('../../assets/FotosAchô/google.png')} style={css.Gogle}/>
                            <Image source={require('../../assets/FotosAchô/XPreto.png')} style={css.x}/>
                        </View> */}
                        <View style={css.PaiOu}>
                            <Text style={css.ou}>Ou</Text>
                        </View>
                        <View style={css.PaiInput}>
                            <TextInput style={css.input} textInput={nome} value={nome} onChangeText={(digitado) => setNome(digitado)} placeholder="Nome Completo:" />
                            <TextInput style={css.input} textInput={tel} value={tel} onChangeText={(digitado) => setTel(digitado)} placeholder="Telefone:" />
                            <TextInput style={css.input} textInput={email} value={email} onChangeText={(digitado) => setEmail(digitado)} placeholder="Email:" />
                            <TextInput style={css.input} textInput={senha} value={senha} onChangeText={(digitado) => setSenha(digitado)} placeholder="Senha:" />
                        </View>
                        <View style={css.PaiCadastrar}>
                            <TouchableOpacity style={css.btn}>
                                <Text style={css.Texto}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>                   
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const css = StyleSheet.create({
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
})