import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';


export default function Denuncia({ item }) {
    const [comentario, setComentario] = useState(false);
    const [comentarioTexto, setComentarioTexto] = useState("");
    const [usuarioId, setUsuarioId] = useState(0);
    const [publicacaoId, setPublicacaoId] = useState(0);
    const [expandido, setExpandido] = useState(false);
    const { id } = useContext(AuthContext);

    const limiteCaracteres = 100;
    const descricao = item.campanhaDescricao || item.publicacaoDescricao || item.denunciaDescricao || '';

    async function SalvarObs() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/InsertComentario ', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                comentarioTexto: comentarioTexto,
                usuarioId: usuarioId,
                publicacaoId: publicacaoId
            })
        })
            //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }

    async function getComentario() {
        await fetch( process.env.EXPO_PUBLIC_URL +  '/api/Denuncia/GetAllDenuncias', {
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
    

    return (
        <View style={css.container}>
            <View style={css.CaixaTitulo}>
                <View style={css.BoxTitulo}>
                    <Image style={css.Avatar}
                        source={require('../../assets/FotosComuniQ/UsuarioSem.png')}
                    />
                    <Text style={css.TextoNOme}>Anônimo</Text>
                </View>
                {item.campanhaTitulo && <Text style={css.title}>{item.campanhaTitulo}</Text>}
                {item.denunciaTitutlo && <Text style={css.title}>{item.denunciaTitutlo}</Text>}
                {item.publicacaoTitulo && <Text style={css.title}>{item.publicacaoTitulo}</Text>}
            </View>
            <View style={css.CaixaImagem}>
                {item.denunciaMidia && <Image style={css.imagemG} source={{ uri: "http://comuniq.s3.amazonaws.com/" + item.denunciaMidia }} />}
                {item.publicacaoMidia && <Image style={css.imagemG} source={{ uri: "http://comuniq.s3.amazonaws.com/" + item.publicacaoMidia }} />}
                {item.campanhaMidia && <Image style={css.imagemG} source={{ uri: "http://comuniq.s3.amazonaws.com/" + item.campanhaMidia }} />}
            </View>
            <View style={css.CaixaTitulo}>
                {descricao && (
                    <View>
                        <Text style={css.title2}>
                            {expandido ? descricao : descricao.substring(0, limiteCaracteres) + '...'}
                        </Text>
                        <TouchableOpacity onPress={() => setExpandido(!expandido)}>
                            <Text style={css.botaoVerMais}>
                                {expandido ? 'Ver menos' : 'Ver mais'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View>
                {item.publicacaoId &&
                    <TouchableOpacity style={css.btn01} onPress={() => setComentario(true)}>
                        <Text style={css.TextoBTNC}>Comentarios</Text>
                    </TouchableOpacity>
                }
                {comentario &&
                    <View style={css.PaiInput}>
                       <TextInput style={css.input} textInput={comentarioTexto} value={comentarioTexto} onChangeText={(digitado) => setComentarioTexto(digitado)} placeholder="Novo Comentario" />
                        <TouchableOpacity style={css.btn02} onPress={() => SalvarObs()}>
                            <Text style={css.TextoBTNC}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: 370,
        backgroundColor: "#D9D9D9",
        marginTop: 25,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    CaixaTitulo: {
        width: "100%",
        display: "flex",
        marginBottom: 20,
        paddingLeft: 5
    },
    title: {
        color: "black",
        marginTop: 20,
        fontSize: 20,
    },
    CaixaImagem: {
        width: "100%",
        height: 200,

    },
    imagemG: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    TextoNOme: {
        marginLeft: 10,
        fontSize: 20,
    },
    BoxTitulo: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",

    },
    Avatar: {
        width: 50,
        height: 50,
        //backgroundColor:"red",
        borderRadius: 50
    },
    title2: {
        fontSize: 18,
        fontWeight: "400",
        marginTop: 20
    },
    btn01: {
        marginTop: 15,
        backgroundColor: "#20343F",
        width: 320,
        height: 50,
        borderRadius: 10,
        color: "white",
      },
    btn02: {
        marginTop: 5,
        backgroundColor: "#20343F",
        width: 320,
        height: 50,
        borderRadius: 10,
        color: "white",
    },
    TextoBTNC: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 20,
        fontWeight:"400"
      },
    input: {
        width: 300,
        height: 50,
        borderColor: "#20343F",
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: "white",
        marginBottom: 5,
        marginTop: 10,
        marginLeft:10,
        padding:5
      },
      botaoVerMais:{
        color: "blue",

      },

})