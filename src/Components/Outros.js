import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Outros({ publicacaoTitulo, publicacaoMidia, publicacaoDescricao, bairroId }) {
    const [comentario, setComentario] = useState(false);
    const [comentarios, setComentarios] = useState();
    const [comentarioTexto, setComentarioTexto] = useState([]);
    const [publicacaoId, setPublicacaoId] = useState(0);
    
    const getImageSource = () => {
        return `data:image/jpeg;base64,${publicacaoMidia}`
    }

///////////////////////////////////////////
    async function SalvarObs() {
        console.log(id);
        if(comentarioTexto != null){
            await fetch(process.env.EXPO_PUBLIC_URL + '/InsertComentario', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    comentarioTexto: comentarioTexto,
                    usuarioId: id,
                    publicacaoId: publicacaoId,
                })
            })
                //PEGA AS COISAS DA API(MUDAR DE ACORDO COM AS RESPOSTAS DA API)
                .then(res => res.json())
                .then(json => { setComentarioTexto(''); })
                .catch(err => console.log(err))
        }
        }
//////////////////////////////////////////////////////////

async function getComentarios() {
    await fetch(process.env.EXPO_PUBLIC_URL + '/GetComentariosByPost?id=' + publicacaoId, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            setComentarios(json);
        })

        .catch(err => console.log(err))
}

useFocusEffect(
    React.useCallback(() => {
        getComentarios()
    }, [comentario]))
/////////////////////////////////////////////////////////

function showComentario(publicacao) {
    setComentario(true);
    if (publicacao.publicacaoId) {
        setPublicacaoId(publicacao.publicacaoId);
    }
    if (publicacao.denunciaId) {
        setPublicacaoId(publicacao.denunciaId);
    }
    if (publicacao.comentarioId) {
        setPublicacaoId(publicacao.comentarioId);
    }
    if (publicacao.campanhasId) {
        setPublicacaoId(publicacao.campanhasId);
    }
    if (comentario) { setComentario(false) }

}

useEffect(() => {
    getComentarios();
}, [publicacaoId])
//////////////////////////////////////////////////////



    return (

        <View style={css.container}>
            <View style={css.boxTitle}>
                <Text style={css.title}>{publicacaoTitulo}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: getImageSource() }} style={css.imagemG} />
            </View>
            <View style={css.boxTitle2}>
            <Text style={css.title2}>{publicacaoDescricao}</Text>
            </View>
            
////////////////////////////////////////////////////////

            <View>
                {item.publicacaoId &&
                    <TouchableOpacity style={css.btn01} onPress={() => { showComentario(item) }}>
                        <Text style={css.TextoBTNC}>Comentarios</Text>
                    </TouchableOpacity>
                }
                {comentario &&
                    <View style={css.PaiInput}>
                        <FlatList
                            data={comentarios}
                            keyExtractor={(item) => item.comentarioId}
                            renderItem={({ item }) => <>
                            <View style={css.fotoEnome}>{item.usuario.usuarioFoto ?
                                    <Image style={css.AvatarPu} source={{ uri: "http://comuniq.s3.amazonaws.com/" + item.usuario.usuarioFoto }}></Image>
                                    :
                                    <Image style={css.AvatarPu} source={require('../../assets/FotosComuniQ/UsuarioSem.png')} />

                                }
                                <Text style={css.nome}>{item.usuario.usuarioNome}</Text></View>
                                <Text style={css.txtComent}>{item.comentarioTexto}</Text>
                                <View style={css.linha}></View>
                            </>
                            }
                        />

                        <TextInput style={css.input} textInput={comentarioTexto} value={comentarioTexto} onChangeText={(digitado) => setComentarioTexto(digitado)} placeholder="Novo Comentario" />
                        <TouchableOpacity style={css.btn02} onPress={() => SalvarObs()}>
                            <Text style={css.TextoBTNC}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

////////////////////////////////////////////////////////////////


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
        justifyContent:"center",
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    boxImage: {
        width: "90%",
        height: 390,
        marginTop:10
    },
    imagemG: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius:10
    },
    boxTitle: {
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
    },
    title: {
        fontSize: 25,
        fontWeight: "400",
        marginLeft: 10,
        marginTop:5,
    },
    boxTitle2: {
        width: "100%"
    },
    title2: {
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 15,
        marginTop:5
    },
})