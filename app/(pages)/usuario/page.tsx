import UsuariosCadastrados from "@/app/components/UsuariosCadastrados/UsuariosCadastrados"
import Link from "next/link"

export default function Usuario() {
    return (
        <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
            <div className="bg-(--cinza) w-full h-full rounded-lg flex p-[1em] flex-col">
                <div className="mb-[5em] flex items-center justify-between">
                    <div>
                        <h1 className="text-[2em] font-[Montserrat] font-bold">Alessandro Lira</h1>
                        <p className="font-bold text-[#6B6B6B]">Administrador</p>
                    </div>
                    <nav>
                        <Link className="cursor-pointer" href="/habilitarUsuario">Habilitar Novo Usuario</Link>
                    </nav>
                </div>
                <UsuariosCadastrados id={1} nome="Filipe Gugel" status="Ativo" dataCriacao="21/01/2025" fila={12}></UsuariosCadastrados>
                <UsuariosCadastrados id={2} nome="Giovanna Stonks" status="Inativo" dataCriacao="12/04/2025" fila={0}></UsuariosCadastrados>
                <UsuariosCadastrados id={3} nome="Alessandro Lira" status="Ativo" dataCriacao="01/01/2025" fila={23}></UsuariosCadastrados>
            </div>
        </div>
    )
} 
