import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Camera, CameraType } from 'expo-camera/legacy';
import AWS from '../services/AWS';
import * as FileSystem from 'expo-file-system';

export default function TelaCamera() {

    const { height, width } = Dimensions.get('window');

    const screenRatio = height / width;

    const { setCamera, user } = useContext(AuthContext);

    const [permissao, setPermissao] = useState(false);
    const [tipo, setTipo] = useState(CameraType.back);
    const [foto, setFoto] = useState();
    const [fotoOK, setFotoOK] = useState(false);
    const [blob, setBlob] = useState();
    const [aceite, setAceite] = useState();

    const CameraRef = useRef();

    async function PermissaoCamera() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status == "granted") {
            setPermissao(true);
        }
    }

    function TrocaTipoCamera() {
        setTipo(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function TirarFoto() {
        setFoto(false);
        setBlob(false);
        setFotoOK(true);
        const upload = await CameraRef.current.takePictureAsync({ quality: 0.5 });

        if (upload) {
            const base64Image = await FileSystem.readAsStringAsync(upload.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setFoto(base64Image);
            try {
                const response = await fetch(upload.uri);
                const blob = await response.blob();
                setBlob(blob);
            } catch (error) {
                console.log(error)
            }
        }
    }


    async function uploadPhoto() {
        const S3 = new AWS.S3();
        const object = {
            Bucket: "comuniq",
            Key: "usuario_" + user.usuarioCPF + ".jpg"
        };
        const excluir = await S3.deleteObject(object).promise();
        const params = {
            Bucket: "comuniq",
            Key: "usuario_" + user.usuarioCPF + ".jpg",
            Body: blob
        };
        const result = await S3.upload(params).promise();
        if (result) {
            setBlob(false);
            setFotoOK(false);
        }
    }

    useEffect(() => {
        PermissaoCamera();
    }, [])

    return (
        <View>
            <View style={css.caixa}>
                <TouchableOpacity style={css.btnLogo} onPress={() => { getAll() }}>
                    <Image style={css.tinyLogo} source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")} />
                </TouchableOpacity>
            </View >
            {permissao ?
                /*Parte que deu certo*/
                <View style={{ width: "100%", height: "85%" }}>
                    <Camera
                        style={css.camera}
                        type={tipo}
                        ref={CameraRef}
                        ratio={screenRatio}
                    >
                    </Camera>
                    <View style={css.barraFoto}>
                        <TouchableOpacity style={css.cancelar} onPress={() => setCamera(false)}>
                            <Image style={css.cancelarimg} source={{ uri: "https://cdn-icons-png.flaticon.com/512/93/93634.png", }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={css.TiFoto} onPress={TirarFoto}></TouchableOpacity>
                        <TouchableOpacity style={css.alternar} onPress={TrocaTipoCamera}>
                            <Image style={css.Alternarimg} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1837/1837541.png", }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                /*Parte qu dei errad*/
                <Text>Algo Deu Errado</Text>}
            {(fotoOK && permissao && foto) &&
                <Modal
                    animationType="slide"
                    transparente={true}>
                    {foto && <Image source={{ uri: `data:image/jpeg;base64,${foto}` }} style={css.fotinha} />}
                    <View style={css.botoes}>
                        <TouchableOpacity style={css.btns} onPress={() => { uploadPhoto(); setCamera(false) }}>
                            <Image style={css.salvarimg} source={{ uri: "https://png.pngtree.com/png-vector/20231201/ourmid/pngtree-ok-icon-like-png-image_10804394.png", }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={css.btns} onPress={() => { setFotoOK(false) }}>
                            <Image style={css.cancelarimg2} source={{ uri: "https://cdn-icons-png.flaticon.com/512/126/126497.png", }}></Image>
                        </TouchableOpacity>
                    </View>
                </Modal>
            }
        </View>
    )
}

const css = StyleSheet.create({
    caixa: {
        height: "15%",
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
    camera: {
        width: "100%",
        height: "85%",
        resizeMode: "center"
    },
    Alternarimg: {
        width: 40,
        height: 40
    },
    alternar: {
        backgroundColor: "#fff",
        opacity: 0.7,
        width: 60,
        height: 60,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TiFoto: {

        backgroundColor: "#fff",
        opacity: 0.7,
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    barraFoto: {
        width: '100%',
        backgroundColor: '#20343F',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15,
        zIndex: 99,
        position: 'absolute',
        bottom: 0,
        left: 0

    },
    cancelarimg: {
        width: 40,
        height: 40
    },
    cancelarimg2: {
        width: 80,
        height: 80
    },
    salvarimg: {
        width: 80,
        height: 80,
    },
    cancelar: {
        backgroundColor: "#fff",
        opacity: 0.7,
        width: 60,
        height: 60,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btns: {
        backgroundColor: "#fff",
        opacity: 0.7,
        width: 100,
        height: 100,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    fotinha: {
        width: '100%',
        height: 500,
    },
    botoes: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 350,
        backgroundColor: '#20343F',
    },
})