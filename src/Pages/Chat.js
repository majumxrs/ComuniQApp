import { Button, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import uuid from 'react-native-uuid';



export default function Chat() {
    const [mensagem, setMensagem] = useState("");
    const [conversa, setConversa] = useState([]);

    const FlatRef = useRef(null);

    const scrollToEnd = () => {
        FlatRef.current?.scrollToEnd({ animated: true })
    };

    useEffect(() => {
        scrollToEnd();
    }, [mensagem])

    useEffect( () => {
        const newConversation = [...conversa, {
            id: uuid.v4(),
            user: false,
            mensagem: "Olá, sou Q, seu assistente virtual! Como posso te ajudar hoje?\n\n•1 para informações de contato com as autoridades;\n•2 para dúvidas sobre o app;\n•3 para relatar um erro;\n•4 para outro motivo,\n•5 para entrar em contato conosco."
        }]
        setConversa(newConversation);
    }, [] );

    function Enviar() {
        Keyboard.dismiss()
        if (mensagem != null && mensagem != "") {
        let botSpeak = "";
            //usuario falando
            const newConversation = [...conversa, {
                id: uuid.v4(),
                user: true,
                mensagem: mensagem
            }];
            setMensagem("");
            //condicionais de resposta
            if (mensagem == "oi") {
                botSpeak = "Digite:\n•1 para informações de contato com as autoridades;\n•2 para dúvidas sobre o app;\n•3 para relatar um erro;\n•4 para outro motivo,\n•5 para entrar em contato conosco.";
            }
            else if (mensagem == "1") {
                botSpeak = "Digite:\n•11 para saber o contato da prefeitura;\n•12 para contatos de serviços de emergência";
            }
            else if (mensagem == "11") {
                botSpeak = "Contato da prefeitura:\nTelefone: 9999999999\nEmail:  prefeitura@gmail.com";
            }
            else if (mensagem == "12") {
                botSpeak = "•Polícia: 190,\n•Samu: 192,\n•Bombeiros: 193,\n•Centro de valorização da vida: 188,\n•Ajuda com o uso de drogas: 132,\n•Polícia Civil: 197,\n•Disque Denúncia: 181,\n•Procon: 151,\n•Polícia Rodoviária: 191,\n•Direitos Humanos: 100,\n•Ouvidoria do SUS: 136,\n•Denúncia trabalho escravo: 123,\n•Defesa Civil: 199,\n•Atendimento exclusivo à mulher: 180,\n•IBAMA: 0800 61 8080,\n•Ouvidoria Geral da União: 121.";
            }
            else if (mensagem == "2") {
                botSpeak = "Digite:\n•21 para saber o objetivo do app;\n•22 para funcionalidades ";
            }
            else if (mensagem == "21") {
                botSpeak = "O app tem como objetivo, manter uma comunidade estável e sustentavél, tendo apoio para diversos meios de saúde e meio ambiente. Sinta-se à vontade para explorar!";
            }
            else if (mensagem == "22") {
                botSpeak = "Qual funcionalidade quer saber?\n\n•221 para login,\n•222 para trocar senha,\n•223 para denúncia,\n•224 para postagens. ";
            }
            else if (mensagem == "221") {
                botSpeak = "O login pode ser realizado com os seguintes meios: Google, Microsoft, Apple, Facebook e Instagram.  ";
            }
            else if (mensagem == "222") {
                botSpeak = "Caso tenha esquecido ou deseja mudar sua senha, na tela de login é possivel, basta clicar em esqueci minha senha, e preencha as informações nescessárias para alteração de senha, lembre-se de ter acesso a um email válido. ";
            }
            else if (mensagem == "223") {
                botSpeak = "Nossa página de denúncia conta com acessos a diversas postagens de sua comunidade refente a algo que não está correto, seja convivência entre as pessoas, descarte indevido de lixo, vandalismo, etc. Você também pode ajudar fazendo uma denúncia consciente.";
            }
            else if (mensagem == "224") {
                botSpeak = " As postagens são a forma de interação que você pode ter com sua comunidade, seja realizando uma denúncia, comentando ou interagindo em ''campanhas'' ";
            }
            else if (mensagem == "3") {
                botSpeak = "Digite:\n•31 para erro de login/cadastro;\n•32 para erro em postagens,\n•33 para erro em campanha ";
            }
            else if (mensagem == "31") {
                botSpeak = "Caso esteja tendo problemas para realizar o login ou o cadastro, certifique-se de revisar suas informações. Caso não seja o nescessário, considere-se mudar sua senha, ou redefinir sua conta de cadastro/login. Caso não funcione entre em contato direto: comuniQsuporte@gmail.com";
            }
            else if (mensagem == "32") {
                botSpeak = "Está com erro na postagem? verifique-se se está com acesso a internet ou tente reiniciar o app. Caso não funcione entre em contato direto: comuniQsuporte@gmail.com";
            }
            else if (mensagem == "33") {
                botSpeak = " Campanha está com erro? verifique se seu perfil tem a possibilidade de realizar uma campanha, para tal funcionalidades, apenas perfis relacionado direto com a prefeitura tem acesso a tal funcionalidade. Caso informações da campanha seja incorretas, denuncie! Caso seja outro problema entre em contato direto:\ncomuniQsuporte@gmail.com ";
            }
            else if (mensagem == "4") {
                botSpeak = "Você pode entrar em contato conosco pelo nosso email de suporte(comuniQsuporte@gmail.com), ou escreva sua dúvida pelo chat, a qual será encaminhada para nossa equipe.";
            }
            else if (mensagem == "5") {
                botSpeak = "Nosso email de suporte é comuniQsuporte@gmail.com";
            }
            else {
                botSpeak = "Desculpe, não conheço esse comando! Encaminharei sua mensagem para nossa equipe"
            }
            //resposta do bot
            newConversation.push({
                id: uuid.v4(),
                user: false,
                mensagem: botSpeak
            });
            setConversa(newConversation);
        }
    }

    return (
        <View style={css.chat}>
            <View style={css.caixa}>
                <Image
                    style={css.tinyLogo}
                    source={require("../../assets/FotosComuniQ/LogoComuniQ.jpeg")}
                />
            </View>
            <View style={css.qaba}>
                <Image style={css.Qfoto}
                    source={
                        require("../../assets/FotosComuniQ/comuniqRoboIconCORRECT.jpg")
                    }
                >
                </Image>
                <Text style={css.Qname}>Q</Text>
            </View>
            <FlatList
                ref={FlatRef}
                data={conversa}
                renderItem={({ item }) =>
                    <View>
                        <Text style={(item.user) ? css.mensagemUsu : css.mensagem}>{item.mensagem}</Text>
                    </View>
                }
                keyExtractor={(item) => item.id}
            />
            <View style={css.digitando}>
                <TextInput
                    style={css.input}
                    textInput={mensagem}
                    onChangeText={(digitado) => setMensagem(digitado.toLowerCase())}
                    value={mensagem}
                />
                <TouchableOpacity style={css.btn} onPress={Enviar}>
                    <Image style={css.BTNenviar}
                        source={require("../../assets/FotosComuniQ/PapperPlaneIcon.png")}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const css = StyleSheet.create({
    chat: {
        backgroundColor: "white",
        height: '100%'
    },
    qaba: {
        backgroundColor: "#D9D9D9",
        height: 65,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    digitando: {
        backgroundColor: "#D9D9D9",
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    BTNenviar: {
        width: 30,
        height: 30,
        objectFit: 'contain'
    },
    Qfoto: {
        width: 50,
        height: 50,
        objectFit: 'contain',
        borderRadius: 100,
        marginLeft: 10,
    },
    conversando: {
        height: "86.5%",
        backgroundColor: "white",
    },
    input: {
        width: "80%",
        padding: 10,
    },
    btn: {
        width: '15%',
        padding: 10,
        backgroundColor: "#20343F",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
    },
    mensagem: {
        backgroundColor: "#D9D9D9",
        margin: 10,
        width: 280,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 15,
        borderRadius: 30,
        textAlign: 'justify'
    },
    mensagemUsu: {
        backgroundColor: '#515151',
        width: 280,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 10,
        marginLeft: 120,
        color: "#fff",
        padding: 15,
        borderRadius: 30
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

    Qname: {
        fontSize: 25,
        marginLeft: 10
    }
})




/*const [mensagemUsu, setmensagemUsu] = useState('');
const [respostaInput, setRespostaInput] = useState('');

function funciona() {
  if (mensagemUsu == "Olá")
      return setRespostaInput("Olá, como posso te ajudar hoje? Digite Prefeitura para mais opções, ou Sobre o app para mais informações.");
  else
      return setRespostaInput("Tente começar com Olá.");*/



/* onChangeText={(digitado) => setmensagemUsu(digitado)}  */


/* <Text>{respostaInput}</Text> */