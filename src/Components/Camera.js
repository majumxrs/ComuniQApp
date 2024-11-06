import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Camera, CameraType } from 'expo-camera/legacy';


export default function TelaCamera() {
    const { setCamera, fotoSalva, setFotoSalva } = useContext(AuthContext);

    const [permissao, setPermissao] = useState(false);
    const [tipo, setTipo] = useState(CameraType.back);
    const [foto, setFoto] = useState("");

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
        const foto = await CameraRef.current.takePictureAsync();
        setFoto(foto.uri);
        setFotoSalva(foto);
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
                <>
                    <Camera
                        style={css.camera}
                        type={tipo}
                        ref={CameraRef}
                        ratio="16:9"
                        onBarCodeScanned={scaned => {
                            if (scaned.raw) {
                                setQrcode(scaned.raw);
                                console.log(scaned.raw);
                            }
                        }
                        }
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
                </>
                :
                /*Parte qu dei errad*/
                <Text>Deu Errado</Text>}

            {(foto && permissao) &&
                <Modal
                    animationType="slide"
                    transparente={true}>
                    <Image
                        source={{ uri: foto }}
                        style={css.fotinha}
                    />
                    <View style={css.botoes}>
                        <TouchableOpacity style={css.btns} onPress={() => setFoto("")}>
                            <Image style={css.salvarimg} source={{ uri: "https://png.pngtree.com/png-vector/20231201/ourmid/pngtree-ok-icon-like-png-image_10804394.png", }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={css.btns} onPress={() => setCamera(false)}>
                            <Image style={css.cancelarimg2} source={{ uri: "https://cdn-icons-png.flaticon.com/512/126/126497.png", }}></Image>
                        </TouchableOpacity>
                    </View>
                </Modal>

            }

        </View>
    )
}

const css = StyleSheet.create({
    camera: {
        width: "100%",
        height: "75.5%",
        resizeMode: 'contain'
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
        position: 'relative',

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
        height: 600,
        backgroundColor: '#20343F',
        padding: 20
    },
    caixa: {
        height: 100,
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
})