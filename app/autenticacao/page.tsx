"use client"

import AuthInput from "@/components/auth/AuthInput";
import { useState } from "react";
import Image from "next/image"
import { IconeAtencao } from "@/components/icons";
import useAuth from "@/components/data/hook/useAuth";

export default function Autenticacao() {

    const {usuario, loginGoogle} = useAuth()

    const [erro, setErro] = useState(null)
    const [modo, setModo] = useState<"login" | "cadastro">("login")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function exibirErro(msg: any, tempoEmSegundos = 5){
        setErro(msg)
        setTimeout(() => {
            setErro(null)
        }, tempoEmSegundos * 1000);
    }

    function submeter() {

        if (modo === "login") {
            exibirErro("ocorreu um erro no login!")
        } else {
            exibirErro("ocorreu um erro no cadastro")
        }

    }

    return (
        <div className="flex h-screen items-center justify-center">

            <div className="hidden md:block relative md:w-1/2 h-screen lg:w-2/3">
              <Image 
              src="/paisagem.jpg" 
              alt="Imagem tela de autenticação"
              fill
              className="object-cover"
              />
            </div>

            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`
                text-3xl 
                font-bold
                mb-5
                `}>
                    {modo === "login" ? "Entre com a sua Conta" : "Cadastre-se na Plataforma"}
                </h1>

                {erro ? (
                    <div className={`
                    flex items-center
                    bg-red-400
                    text-white
                    py-3 px-5
                    my-2
                    border border-red-700
                    rounded-lg
                    `}>
                        {IconeAtencao()}
                        <span className="ml-3">{erro}</span>
                    </div>
                ) : false}    
                

                <AuthInput
                    label="email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                />

                <AuthInput
                    label="senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                />

                <button onClick={submeter} className={`
                w-full
                bg-indigo-500
                hover:bg-indigo-400
                text-white
                rounded-lg
                px-4 py-3 mt-6
                cursor-pointer  
                `}>
                    {modo === "login" ? "Entrar" : "Cadastrar"}
                </button>

                <hr className="my-6 border-gray-300 w-full"></hr>

                <button onClick={loginGoogle} className={`
                w-full
                bg-red-500
                hover:bg-red-400
                text-white
                rounded-lg
                px-4 py-3
                cursor-pointer  
                `}>
                    Entrar com Google
                </button>

            {modo === "login" ? (
                <p className="mt-8">
                    Novo por aqui?
                    <a onClick={() => setModo("cadastro")} className={`
                    text-blue-500 hover:text-blue-700 
                    font-semibold
                    cursor-pointer
                    `}> Crie uma conta grtuitamente</a>
                </p>
            ) : (
                <p className="mt-8">
                    Já faz parte da nossa comunidade?
                    <a onClick={() => setModo("login")} className={`
                    text-blue-500 hover:text-blue-700 
                    font-semibold
                    cursor-pointer
                    `}> Entre com as suas credenciais</a>
                </p>
            )}            

            </div>

        </div>
    )

}