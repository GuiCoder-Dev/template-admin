interface AuthInputProps{
    label: string
    valor: any
    tipo?: "text" | "email" | "password"
    obrigatorio?: boolean
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps){

    return (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input 
                type={props.tipo ?? "text"}
                required={props.obrigatorio}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target.value)}

                className={`
                px-4 py-3
                rounded-lg    
                bg-gray-200
                mt-2
                border focus:border-blue-500 focus:bg-white
                focus:outline-none
                `}
            />
        </div>
    )

}