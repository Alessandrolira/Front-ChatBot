"use client"

import UsuariosCadastrados from "@/app/components/UsuariosCadastrados/UsuariosCadastrados"
import Link from "next/link"
import Button from "@/app/components/Button/Button"
import { useEffect, useState } from "react"

export default function Usuario() {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    
    const [usuarios, setUsuarios] = useState<any>([])

    useEffect(() =>  {
        const fetchDados = async () => {
            const response = await fetch(`http://${baseUrl}/buscarUsuarios`)

            if(response.ok){
                const dados = await response.json();
                setUsuarios(dados)
            }
        } 
        fetchDados()
    }, [])

    console.log(usuarios)

    return (
        <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
            <div className="bg-(--cinza) w-full h-full rounded-lg flex p-[1em] flex-col">
                <div className="mb-[5em] flex items-center justify-between">
                    <div>
                        <h1 className="text-[2em] font-[Montserrat] font-bold">Alessandro Lira</h1>
                        <p className="font-bold text-[#6B6B6B]">Administrador</p>
                    </div>
                    <nav>
                        <div className="flex gap-5">
                            <Link href="/habilitarUsuario" ><Button>Habilitar Novo Usuario</Button></Link>
                            <Link href="/mensagensRecebidas" ><Button>Home</Button></Link>
                        </div>
                    </nav>
                </div>
                {usuarios.map((usuario:any) => {

                    const data = new Date(usuario.ultima_alteracao)

                    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }).format(data);

                    return (
                        <UsuariosCadastrados key={usuario.id} id={usuario.id} nome={usuario.nome} status={usuario.status} fila={0} dataCriacao={dataFormatada} ></UsuariosCadastrados>
                    )               
                })}
            </div>
        </div>
    )
} 
