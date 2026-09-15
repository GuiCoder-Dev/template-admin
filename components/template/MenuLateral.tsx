"use client"

import useAuth from "../data/hook/useAuth";
import { IconeAjustes, IconeCasa, IconeSair, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral(){

    const {logout} = useAuth()

    return(
        <aside className="
        flex flex-col
        bg-gray-200
        ">
            <div className="
            h-20
            w-20
            bg-gradient-to-r from-indigo-500 to-purple-800
            flex flex-col items-center justify-center
            ">
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Início" icone={IconeCasa}/>
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjustes}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino}/>
            </ul>
            <ul className="">
                <MenuItem onClick={logout} texto="Sair" icone={IconeSair}
                    className={`
                        text-red-600
                        `}
                />
            </ul>
        </aside>
    )

}