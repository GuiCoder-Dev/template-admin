"use client"

import Usuario from "@/model/Usuario"
import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {User, signInWithPopup, GoogleAuthProvider, onIdTokenChanged} from "firebase/auth"
import auth from "@/lib/firebase"
import Cookies from "js-cookie"

interface AuthContextProps {
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormaliado(usuarioFirebase: User): Promise<Usuario>{
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName ?? "",
        email: usuarioFirebase.email ?? "",
        token: token ?? "",
        provedor: usuarioFirebase.providerData[0]?.providerId ?? "",
        imagemUrl: usuarioFirebase.photoURL ?? ""
    }
}

function gerenciarCookie(logado: boolean){
    if(logado){
        Cookies.set("admin-template-auth", String(logado), {
            expires: 7
        })
    } else {
        Cookies.remove("admin-template-auth")
    }
}

export function AuthProvider(props: any){

    const router = useRouter()
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>()

    async function configurarSessao(usuarioFirebase: User | null){
        if(usuarioFirebase?.email) {
            const usuario = await usuarioNormaliado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(undefined)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    } 

    async function loginGoogle(){

        try{
            setCarregando(true)
            const provider = new GoogleAuthProvider()
            const resp = await signInWithPopup(
            auth,
            provider
        )

            if(resp.user == null){
                return
            }

            configurarSessao(resp.user)
            router.push("/")
        } finally {
            setCarregando(false)
        }
    }

    async function logout(){
        try{
            setCarregando(true)
            await auth.signOut()
            await configurarSessao(null)

        } finally {
            setCarregando(false)
        }
        
    }

    useEffect(() => {
        if(Cookies.get("admin-template-auth")){
            const cancelar = auth.onIdTokenChanged(configurarSessao)
            return () => cancelar()
        }
    }, [])

    return(

        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>

    )

}

export default AuthContext