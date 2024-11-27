import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import SelectCampanha from './SelectCampanha';
import SelectCidade from './SelectCidade';
import { AuthContext } from '../Context/AuthContext';
import TelaCamera from './Camera';
import * as ImagePicker from 'expo-image-picker';


export default function NovaCamp({ setnovacampanha }) {

    const [titulo, setTitulo] = useState("");
    const [campanha, setcampanha] = useState();
    const [midia, setMidia] = useState("");
    const [descricao, setDescricao] = useState("");
    const [cidades, setCidades] = useState();
    const [cidade, setCidade] = useState();
    const [TipoDenuciaNome, setTipoDenunciaNome] = useState("");
    const [TipoNovaCampanha, SetTipoNovaCampanha] = useState();
    // const [TipoNovaCampanhas, SetTipoNovaCampanhas] = useState();
    const [deubom, setDeubom] = useState(false);
    const [error, setError] = useState(false);
    const [image, setImage] = useState(null);
    const [blob, setBlob] = useState();
    const { id, novaFoto, setNovaFoto, setCamera, camera, SetUser, user, novapupli, setNovapupli } = useContext(AuthContext);

    async function SalvarCamp() {
        if (titulo != "" || descricao != "") {
            fetch(process.env.EXPO_PUBLIC_URL + '/api/Campanhas/InsertCampanha', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    campanhaTitulo: titulo,
                    campanhaMidia: null,
                    campanhaDescricao: descricao,
                    tipoCampanhaId: TipoNovaCampanha.tipoCampanhaId,
                    cidadeId: cidade.cidadeId,
                    usuarioId: user.usuarioId
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setcampanha(json);
                    if (!blob) {
                        setDeubom(true);
                        setError(false);
                    }
                })
                .catch(err => console.log(err))
        } else {
            setError(true)
            setDeubom(false)
        }
    }

    async function EditaESalvaCamp() {
        if (midia != null) {
            await fetch(process.env.EXPO_PUBLIC_URL + '/api/Campanhas/UpdateCampanha/' + campanha.campanhaId, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    campanhaTitulo: campanha.campanhaTitulo,
                    campanhaMidia: midia,
                    campanhaDescricao: campanha.campanhaDescricao,
                    tipoCampanhaId: campanha.tipoCampanhaId,
                    cidadeId: campanha.cidadeId,
                    usuarioId: campanha.usuarioId
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        setcampanha(json);
                        setDeubom(true);
                        setError(false);
                    }

                })
                .catch(err => console.log(err))
        }
    }

    async function getCidades() {
        fetch(process.env.EXPO_PUBLIC_URL + '/api/Cidades/GetAllCidades', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    setCidades(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }

    async function getTipoDenuncia() {
        fetch(process.env.EXPO_PUBLIC_URL + '/GetAllTipoDenuncias', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    setTipoDenunciaNome(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }

    async function getTipoCampanha() {
        fetch(process.env.EXPO_PUBLIC_URL + '/api/TipoCampanhas/GetAllTipoCampanhas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    SetTipoNovaCampanha(json);
                }
            })
            .catch(err => { setError(true); setDeubom(false); })
    }


    async function pickImage() {
        setImage(null);
        setBlob(null);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            setBlob(blob);
            setNovaFoto(false);
        }
    };

    async function uploadPhoto() {
        const S3 = new AWS.S3();
        const object = {
            Bucket: "comuniq",
            Key: "campanha_" + campanha.campanhaId + ".jpg"
        };

        const excluir = await S3.deleteObject(object).promise();
        const params = {
            Bucket: "comuniq",
            Key: "campanha_" + campanha.campanhaId + ".jpg",
            Body: blob
        };
        const result = await S3.upload(params).promise();
        if (result) {
            setBlob(false);
            setMidia(result.Key)
        }
    }
    useEffect(() => {
        getCidades();
        getTipoDenuncia();
        getTipoCampanha();
    }, [])

    useEffect(() => {
        if (campanha && blob) {
            uploadPhoto();
        }
    }, [campanha, blob])

    useEffect(() => {
        if (midia) {
            EditaESalvaCamp();
        }
    }, [midia]);

    if (camera == true) {
        return (
            <TelaCamera />
        )
    }

    return (
        <ScrollView  >
            <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setnovacampanha(false) }}>❮</Text>
            </TouchableOpacity>
            <View style={css.caixamaior}>
                <View style={css.container}>
                    <Text>Nova Campanha</Text>
                    <Text></Text>
                    <TextInput
                        style={css.input2}
                        textInput={titulo}
                        value={titulo}
                        onChangeText={(digitado) => setTitulo(digitado)}
                        placeholder="O que aconteceu:"
                        placeholderTextColor="black"
                    />
                    <Text></Text>
                    <TextInput
                        style={css.input2}
                        textInput={descricao}
                        value={descricao}
                        onChangeText={(digitado) => setDescricao(digitado)}
                        placeholder="Descreva a campanha:"
                        placeholderTextColor="black"
                    />
                    {novaFoto &&
                        <Modal
                            animationType="slide"
                            transparent={true}>
                            <View style={css.popup}>
                                <TouchableOpacity style={css.btnpop} onPress={pickImage}>
                                    <Text style={css.txtpop}>Procurar foto existente</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={css.btnpop} onPress={() => setNovaFoto(false)}>
                                    <Text style={css.txtpop}>Fechar</Text>
                                </TouchableOpacity>

                            </View>
                        </Modal>}
                    <Text></Text>
                    <SelectCidade data={cidades} setCidade={setCidade} />
                    <Text></Text>
                    <SelectCampanha data={TipoNovaCampanha} SetTipoNovaCampanha={SetTipoNovaCampanha} />
                    <Text></Text>
                    <TouchableOpacity style={css.foto} onPress={() => setNovaFoto(true)}>
                        <Text style={css.textoFoto}>Selecione uma foto</Text>
                    </TouchableOpacity>
                    <Text></Text>
                    {image && <Image source={{ uri: image }} style={css.foto2} />}
                    <Text></Text>
                    {deubom &&
                        <>
                            <Text style={css.deuBom}>Nova campanha adicionada com sucesso!</Text>
                        </>
                    }
                    {error &&
                        <>
                            <Text style={css.deuRuim} >Não foi possivel adicionar a nova campanha!</Text>
                        </>
                    }
                    <View style={css.PaiCadastrar2}>
                        <TouchableOpacity style={css.btn} onPress={() => { SalvarCamp(); }}>
                            <Text style={css.btnLoginText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const css = StyleSheet.create({
    caixamaior: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
    },
    input2: {
        width: 350,
        height: 50,
        borderColor: "#20343F",
        borderRadius: 15,
        backgroundColor: "#fff",
        marginBottom: 5,
        marginTop: 5,
        padding: 10,
    },
    container: {
        backgroundColor: "#B3B3B3",
        flexGrow: 1,
        color: "white",
        alignItems: "center",
        width: 380,
        borderRadius: 10,
        padding: 10,
    },

    btn: {
        width: 300,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#20343F"
    },
    btnLoginText: {
        lineHeight: 45,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "400",
        color: "white"
    },
    btnV: {
        width: 150,
        height: 50,
        borderRadius: 10,
        marginTop: 50,
        backgroundColor: "#20343F",
        marginLeft: 20,
    },
    btnLoginTextV: {
        lineHeight: 45,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "400",
        color: "white"
    },
    deuBom: {
        color: "#008000"
    },
    deuRuim: {
        color: "red"
    },
    foto: {
        lineHeight: 45,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "400",
        color: "white"
    },
    foto2: {
        width: 150,
        height: 150,
    },
    textoFoto: {
        fontSize: 20,
        marginTop: 5
    },
    popup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20343F',
        borderRadius: 20,
        width: '80%',
        padding: 20,
        margin: 'auto',
    },
    txtpop: {
        color: "#fff",
        padding: 8
    },
    BTNVoltar: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 5
    },
})