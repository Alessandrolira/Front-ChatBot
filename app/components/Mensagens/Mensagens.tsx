interface MensagensProps {
    children: React.ReactNode;
    nome?: string;
    usuario: boolean;
    data?: string
}

export default function Mensagens({ children, nome, usuario, data }: MensagensProps) {
    return (
        <div className={`flex ${usuario ? "justify-start" : "justify-end"} pt-[1em]`}>
            <div className={`w-[70%] pt-[0.7em] pb-[0.7em] pl-[1.4em] pr-[1.4em] rounded-lg 
                ${usuario ? "bg-(--branco) text-(--background)" : "bg-(--azulw3) text-white"}
            `}>
                <h2 className="font-bold">{usuario ? nome : "Assistente Virtual"}</h2>
                <p className="text-[0.8em]">{children}</p>
                <p className="flex justify-end text-[0.8em]">{data}</p>
            </div>
        </div>
    );
}
