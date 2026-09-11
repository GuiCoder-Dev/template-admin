import Link from "next/link"

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps){

    function renderizarLink(){
        return (
            <Link href={props.url!} className="
            flex flex-col justify-center items-center
            w-20
            h-20
            ">
                {props.icone}
                <span className="
                text-xs
                font-light
                text-gray-600
                ">{props.texto}
                </span>
            </Link>   
        )
    }

    return(
       <li onClick={props.onClick}className={`
       hover:bg-gray-100
       cursor-pointer
       ${props.className}
       `}>
            {props.url ? renderizarLink() : 

                <div className="
                flex flex-col justify-center items-center
                w-20
                h-20
                ">
                    {props.icone}

                    <span className={`
                    text-xs
                    font-light
                    text-gray-600
                    ${props.className}
                    `}>
                        {props.texto}
                    </span>
                </div>
            }   
       </li>
    )

}