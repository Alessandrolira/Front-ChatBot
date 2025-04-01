interface ConversasProps {
    nome: string
    ultima_mensagem?: string
}

export default function Conversas( {nome, ultima_mensagem} : ConversasProps) {
    return (
        <>
            <div className="bg-(--background) pt-[1em] pb-[1em] pl-[2em] pr-[2em] border-3 border-(--cinza2) flex items-center">
                <div className="rounded-full w-[3em] h-[3em] bg-(--branco) mr-[2em]"></div>
                <div>
                    <h2>{nome}</h2>
                    <p className="text-[0.7em] mt-[0.5em]">{ultima_mensagem}</p>
                </div>
            </div>
        </>
    )
}
