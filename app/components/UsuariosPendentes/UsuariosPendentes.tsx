"use client"

import React, { useEffect, useState } from "react"

interface UsuariosPendentesProps {
    id: number,
    nome: string,
    email: string,
    acesso: string,
    criado_em: string,
    atualizado_em: string,
    status: string,
    onSubmit: (id: number, status: string) => void
}

export default function UsuariosPendentes( { id, nome, email, acesso, criado_em, status, onSubmit } : UsuariosPendentesProps) {

    const [novoStatus, setNovoStatus] = useState('')

    function handleAtualizar(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        const novoStatus = document.getElementById('novoStatus') as HTMLInputElement
        setNovoStatus(novoStatus.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(id, novoStatus);
    }

    return (
        <form className="flex items-center mb-8 shadow rounded-xl gap-6" onSubmit={handleSubmit}>
            <p className="w-1/5 font-semibold text-lg truncate">{nome}</p>
            <p className="w-1/5 text-sm truncate">{email}</p>
            <p className="w-1/6 text-sm">{criado_em}</p>

            <select
                className="w-1/5 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                defaultValue="" id="novoStatus" onChange={handleAtualizar} >
                <option value="" disabled className="text-gray-500">Selecione o tipo de acesso</option>
                <option value="admin" className="text-black">Administrador</option>
                <option value="user" className="text-black">Usuário</option>
            </select>

            <p className="w-1/6 text-sm text-yellow-100 text-center">{status}</p>

            <button disabled={novoStatus == "" ? true : false} className={`${novoStatus == "" ? "cursor-not-allowed" : "cursor-pointer"} p-2 hover:bg-green-100 rounded transition `}>
                <img src={`${novoStatus == "" ? "/checkdisable.png" : "/check.png"}`} alt="Confirmar acesso" />
            </button>
        </form>
    )
}

 