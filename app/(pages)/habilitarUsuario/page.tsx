"use client"

import UsuariosPendentes from "@/app/components/UsuariosPendentes/UsuariosPendentes"
import { useEffect, useState } from "react"
import { UsuarioTypes } from "@/app/types/UsuariosTypes"
import Link from "next/link"
import Button from "@/app/components/Button/Button"

export default function HabilitarUsuario() {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const [usuariosPendentes, setUsuariosPendentes] = useState<UsuarioTypes[]>([])
    const [AtualizarPagina, setAtualizarPagina] = useState(false)

    useEffect(() => {
        async function fetchDados() {
            const response = await fetch(`http://${baseUrl}/UsuariosPendentes`)
            const data = await response.json()
            setUsuariosPendentes(data)
        }

        fetchDados()

        console.log(usuariosPendentes)
    }, [AtualizarPagina])

    async function atualizarUsuario(id: number, acesso: string) {

        try {
            const response = await fetch(`http://${baseUrl}/atualizarUsuarioPendente`, {
                method: "POST",
                headers: {"Content-Type" : "application/json" },
                body: JSON.stringify( {id, acesso} )
            })
            response.json()
            if (response.ok) {
                console.log("Usuario atualizado com sucesso")
                setAtualizarPagina(!AtualizarPagina)
            } else {
                console.log("Erro ao atualizar o usuario")
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
            <div className="bg-(--cinza) w-full h-full rounded-lg flex p-[1em] flex-col">
                <div className="flex justify-between items-center mb-[3em]">
                    <h1 className="text-[2em] font-[Montserrat] font-bold">Habilitar Usuarios</h1>
                    <Link href="/mensagensRecebidas" ><Button>Home</Button></Link>
                </div>
                {usuariosPendentes.length == 0 ? <div>
                    <p className="text-center">Não existe usuarios com pendencia para uso do sistema</p>
                </div> : null}
                {usuariosPendentes.map((user) => {

                    const dataCriado = new Date(user.criado_em)

                    const dataFormatadaCriado = new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }).format(dataCriado);

                    const dataAtualizado = new Date(user.atualizado_em)

                    
                    const dataFormatadaAtualizada = new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }).format(dataAtualizado);

                    return (
                        <UsuariosPendentes
                        key={user.id}
                        id={user.id}
                        nome={user.nome}
                        email={user.email}
                        status={user.status}
                        acesso={user.acesso}
                        criado_em={dataFormatadaCriado}
                        atualizado_em={dataFormatadaAtualizada}
                        onSubmit={atualizarUsuario}
                    />
                    )
                })}
            </div>
        </div>
    )
}
