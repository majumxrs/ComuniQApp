import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [id, setId] = useState()
    const [logado, setLogado] = useState(false);
    const [error, setError] = useState(null);
    const [user, SetUser] = useState(false);
    const [menRecupSenha, setMenReupSenha] = useState(true);
    const [ camera, setCamera ]= useState(false);
    const [ fotoNova, setFotoNova ] = useState();
    const [ editPerfil, setEditPerfil ]= useState(false);
    const [ blobblob, setBlobBlob ] = useState();
    const [novaFoto, setNovaFoto] = useState(false);
    const [novacampanha, setNovacampanha] = useState(false);

    async function Login(email, senha) {
        setError(null);

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
                    else {
                        setError(json.message || 'Email ou senha incorretos.');
                    }
                })
                .catch(err => setError('Erro ao conectar com o servidor.')); 
        } else {
            setError('Por favor, preencha todos os campos.');
        }
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
            setCamera: setCamera,
            setFotoNova,
            editPerfil: editPerfil,
            setEditPerfil,
            novaFoto: novaFoto,
            setNovaFoto,
            SetUser,
            novacampanha: novacampanha,
            setNovacampanha
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;