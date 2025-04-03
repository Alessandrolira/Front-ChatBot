interface ConversasProps {
    nomeUser: string
    ultima_mensagemUser?: string
    numeroUser?: number
    dataUser?: number
}

export default function Conversas( {nomeUser, ultima_mensagemUser, numeroUser, dataUser} : ConversasProps) {
    return (
        <>
            <div className="bg-(--background) pt-[1em] pb-[1em] pl-[2em] pr-[2em] border-2 border-(--cinza2) flex items-center">
                <div className="rounded-full w-[3em] h-[3em] bg-(--branco) mr-[2em]"></div>
                <div>
                    <h2>{nomeUser}</h2>
                    <p className="text-[0.7em] mt-[0.5em] line-clamp-2 w-45">{ultima_mensagemUser}</p>
                    <p className="text-[0.8em] mt-[0.5em]">{numeroUser}</p>
                    <div className="flex">
                        <p className="text-[0.6em] mt-[0.5em]">{dataUser}</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
