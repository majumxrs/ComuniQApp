import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

export default function NovaCamps({ setNovapupli, setnovacampanha }) {

    const [titulo, setTitulo] = useState("");
    const [midia, setMidia] = useState("");
    const [descricao, setDescricao] = useState("");

    const [puplicacaId, setPuplicacaoId] = useState([]);
    const [bairroId, setBairro] = useState([]);

    const [deubom, setDeubom] = useState(false);
    const [error, setError] = useState(false);

    async function SalvarCamp() {

        if (titulo != " " || descricao != " ") {
            fetch(process.env.EXPO_PUBLIC_URL + '/api/Campanhas/InsertCampanha', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    campanhaTitulo: titulo,
                    //campanhaMidia: midia,
                    campanhaDescricao: descricao,
                    tipoCampanhaId: puplicacaId,
                    cidadeId: bairroId,
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json) {

                        setDeubom(true);
                        setError(false);
                    }
                })
                .catch(err => setError(true))
        } else {
            setError(true)
            setDeubom(false)
        }
    }

    return (
        <ScrollView  >
            <TouchableOpacity>
                <Text style={css.BTNVoltar} onPress={() => { setnovacampanha(false) }}>❮</Text>
            </TouchableOpacity>
            <View style={css.caixamaior}>

                <Text>Ola teste </Text>

                <View style={css.container}>

                    <Text style={css.mensagem} >O  que aconteceu:CAMP</Text>
                    <TextInput
                        style={css.input2}
                        textInput={titulo}
                        value={titulo}
                        onChangeText={(digitado) => setTitulo(digitado)}
                        placeholder="Titulo da sua Puplicação:"
                        placeholderTextColor="white"
                    />

                    <Text style={css.mensagem} >Descreva o ocorrido:</Text>
                    <TextInput
                        style={css.input2}
                        textInput={descricao}
                        value={descricao}
                        onChangeText={(digitado) => setDescricao(digitado)}
                        placeholder="Titulo da sua Puplicação:"
                        placeholderTextColor="white"
                    />

                    <Text style={css.mensagem} >Qual Bairro?</Text>
                    <RNPickerSelect

                        onValueChange={(setBairro)}
                        items={[
                            { label: 'Centro', value: 1 },
                            { label: 'Bertolini', value: 2 },
                            { label: 'Jardim flores', value: 3 },
                        ]}
                    />

                    <Text style={css.mensagem} >Qual tipo da campanha?</Text>
                    <RNPickerSelect

                        onValueChange={(setPuplicacaoId)}
                        items={[
                            { label: 'institucional	', value: 1 },
                            { label: 'promocional', value: 2 },
                            { label: 'comunitárias', value: 3 },
                        ]}
                    />

                    {deubom &&
                        <>
                            <Text style={css.deuBom}>DEU Bom porra!</Text>
                        </>
                    }
                    {error &&
                        <>
                            <Text style={css.deuRuim} >DEU error seu otario</Text>
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
    mensagem: {
        margin: 10,
        width: 320
    },
    caixamaior: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
    },
    input2: {
        width: 350,
        height: 50,
        borderColor: "#000",
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: "#B3B3B3",
        marginBottom: 5,
        marginTop: 5,
        padding: 10,
    },
    container: {
        width: "100%",
        height: 600,
        backgroundColor: "#D9D9D9",
        display: "flex",
        alignItems: "center",
    },

    btn: {
        width: 300,
        height: 50,
        borderRadius: 10,
        marginTop: 30,
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
})