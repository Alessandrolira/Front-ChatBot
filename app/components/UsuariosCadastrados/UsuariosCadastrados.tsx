"use client"

import Link from "next/link";
import { useState } from "react";

interface UsuarioCadastradosProps {
    id: number;
    nome: string;
    status: string;
    dataCriacao: string;
    fila?: number;
    key: number;
}

const meuIp = "192.168.20.46:5000"


export default function UsuariosCadastrados( { id, nome, status, dataCriacao,  fila} : UsuarioCadastradosProps ) {

    const [EnviarFila, setEnviarFila] = useState(false);
    const [usuarioDeletado, setUsuarioDeletado] = useState(false);

    function handleEnviarFila() {
        setEnviarFila(!EnviarFila);
        console.log(EnviarFila);
    }

    function handleDelete() {
        const idUsuario = id;
        const deletarUsuario = async () => {
            try {
                const response = await fetch(`http://${meuIp}/deletarUsuario`, {
                    method: "DELETE",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ idUsuario })
                })
                response.json()
                if (response.ok) {
                    setUsuarioDeletado(true);
                    console.log("Usuário deletado com sucesso");
                } else {
                    console.error("Erro ao deletar o usuário:", response.statusText);
                }

            } catch (error) {
                console.error("Erro ao deletar o usuário:", error);
            }
        }
        deletarUsuario();
    }   

    return (
        <div className="flex items-center mb-[2em]">
            <p className="text-[1.5em] font-bold w-[20%]">{nome}</p>
            <div className="flex items-center w-[20%]">
                <div className={`h-[1em] w-[1em] ${ status == "Ativo" ? "bg-green-400" : "bg-amber-300"} rounded-full mr-[1em]`}></div>
                <p>{status}</p>
            </div>
            <p className="w-[30%]">Ultima atualização: {dataCriacao}</p>
            <p className="w-[15%]">Fila: {fila} contatos</p>
            <div className="flex gap-5">
                <Link href={`/editarUsuario/${nome}`} id={`editar${id}`}>
                    <img src="/editar.png" alt="Editar" />
                </Link>
                <button onClick={handleEnviarFila} className="cursor-pointer">
                    <img src="/usuarios.png" alt="Trocar Fila" />
                </button>
                { fila == undefined ? '' : <button onClick={handleDelete} disabled={fila > 0} className={`${fila > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
                    <img src={`${fila > 0 ? '/lixeiradisable.png' : '/lixeira.png'}`} alt="Delete" />
                </button>}
            </div>
            
        </div>
    )
} 
