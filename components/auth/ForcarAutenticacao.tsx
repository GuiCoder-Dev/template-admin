import Head from "next/head"
import Image from "next/image"
import loading from "../../public/loading.gif"
import useAuth from "../data/hook/useAuth"

export default function ForcarAutenticacao(props: any){

    const { usuario, carregando } = useAuth()

    function renderizarConteudo(){
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("admin-template-auth")){
                                    window.location.href = "/antenticacao"
                                } 
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando(){
        return(
            <div className={`
            flex justify-center items-center 
            h-screen
            `}>
                <Image src={loading} alt="carregando"/>
            </div>
        )
    }

    if(!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if(carregando){
        return renderizarCarregando()
    } else {
        return null
    }


}