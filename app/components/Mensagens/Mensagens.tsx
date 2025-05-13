interface MensagensProps {
    children: React.ReactNode;
    nome?: string;
    data?: string;
    responsavel?: string
}

export default function Mensagens({ children, nome, data, responsavel }: MensagensProps) {
    return (
    <div className={`flex ${responsavel == "Cliente" ? "justify-start" : "justify-end"} pt-[1em]`}>
        <div className={`w-[70%] pt-[0.7em] pb-[0.7em] pl-[1.4em] pr-[1.4em] rounded-lg ${responsavel == "Cliente" ? "bg-(--branco) text-(--background)" : "bg-(--azulw3) text-white"}`}>
            <h2 className="font-bold">{responsavel == "Cliente" ? nome : responsavel == "IA" ? "Assistente Virtual" : responsavel}</h2>
            <p className="text-[0.8em]">{children}</p>
            <p className="flex justify-end text-[0.8em]">{data}</p>
        </div>
    </div>
    );
}
