import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [id, setId] = useState()
    const [logado, setLogado] = useState(false);
    const [error, setError] = useState(false);
    const [user, SetUser] = useState(false);
    const [menRecupSenha, setMenReupSenha] = useState(true);

    async function Login(email, senha) {

        if (email != "" && senha != "") {
            await fetch('http://10.139.75.25:5251/api/Usuarios/Login', {
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

    return (
        <AuthContext.Provider value={{
            logado: logado,
            Login,
            error: error,
            menRecupSenha: menRecupSenha,
            user: user,
            setLogado,
            id: id
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;