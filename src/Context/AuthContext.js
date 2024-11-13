import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [id, setId] = useState()
    const [logado, setLogado] = useState(false);
    const [error, setError] = useState(false);
    const [user, SetUser] = useState(false);
    const [menRecupSenha, setMenReupSenha] = useState(true);
    const [ camera, setCamera ]= useState(false);
    const [ fotoNova, setFotoNova ] = useState();
    const [ galeria, setGaleria ]= useState(false);
    const [ editPerfil, setEditPerfil ]= useState(false);
    const [ blobblob, setBlobBlob ] = useState();
    const [ cpf, setCPF ] = useState();

    async function Login(email, senha) {

        if (email != "" && senha != "") {
            await fetch(process.env.EXPO_PUBLIC_URL + '/api/Usuarios/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                },
                //metodo de login
                body: JSON.stringify({
                    usuarioEmail: email,
                    usuarioSenha: senha
                })
            })
                //PEGA AS INFORMAÇÕES DO JEITO QUE A API DEVOLVE
                .then(res => res.json())
                .then(json => {
                    if (json.usuarioId) {
                        setId(json.usuarioId)
                        SetUser(json);
                        setLogado(true);
                    }
                }
                )
                .catch(err => setError(true))
        } else {
            setError(true)
        }
    }
    async function GetCPF() {
        await fetch(process.env.EXPO_PUBLIC_URL +'/api/Usuarios/GetUsuarioId/' + id, {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(json => {
              if (Login) {
                setCPF(json.usuarioCPF);
                console.log(cpf + " cpf")
              }
            })
            .catch(err => console.log(err))
    }

    return (
        <AuthContext.Provider value={{
            logado: logado,
            Login,
            error: error,
            menRecupSenha: menRecupSenha,
            user: user,
            setLogado,
            id: id,
            camera: camera,
            fotoNova: fotoNova,
            setCamera,
            setFotoNova,
            galeria: galeria,
            setGaleria,
            editPerfil: editPerfil,
            setEditPerfil,
            cpf: cpf,
            setCPF,
            GetCPF,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;