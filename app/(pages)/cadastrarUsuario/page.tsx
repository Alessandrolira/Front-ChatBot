"use client"

<<<<<<< HEAD
function enviarCadastro(event: React.FormEvent<HTMLFormElement>) {

    event?.preventDefault();

    const nome = document.querySelector('#nome') as HTMLInputElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const senha = document.querySelector('#senha') as HTMLInputElement;
    const confirmarSenha = document.querySelector('#confirmarSenha') as HTMLInputElement;

    const meuIp = "192.168.19.40:5001"

    if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
        alert('Preencha todos os campos');
        return;
    }

    if (senha.value !== confirmarSenha.value) {
        alert('As senhas não coincidem');
        return;
    }

    const usuario = {
        nome : nome.value,
        email : email.value,
        senha : senha.value
    }

    const response = async () => fetch(`http://${meuIp}/cadastrarUsuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

}
=======
import { useState } from "react";
import Link from "next/link";
>>>>>>> b2ef9e19ce73711e48ff9954027475a39986b0dd

export default function CadastrarUsuario() {

    const [aviso, setAviso] = useState(""); // "Sucesso" ou "Erro"
    const [alerta, setAlerta] = useState("");

    async function enviarCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nome = document.getElementById('nome') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const senha = document.getElementById('senha') as HTMLInputElement;
        const confirmarSenha = document.getElementById('senhaConfirmada') as HTMLInputElement;

        const meuIp = process.env.NEXT_PUBLIC_API_URL;

        if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
            setAviso("Erro");
            setAlerta("Preencha todos os campos por favor");
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            setAviso("Erro");
            setAlerta("As senhas não coincidem");
            return;
        }

        const usuario = {
            nome: nome.value,
            email: email.value,
            senha: senha.value
        };

        try {
            const response = await fetch(`http://${meuIp}/cadastrarUsuario`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();

            if (response.ok) {
                setAviso("Sucesso");
                setAlerta(data.mensagem || "Usuário cadastrado com sucesso");
                nome.value = '';
                email.value = '';
                senha.value = '';
                confirmarSenha.value = '';
            } else {
                setAviso("Erro");
                setAlerta(data.mensagem || "Erro ao cadastrar usuário");
            }
        } catch (error) {
            setAviso("Erro");
            setAlerta("Erro de conexão com o servidor");
            console.log(error);
        }
    }

    return (
        <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
            <div className="bg-(--cinza) w-full h-full rounded-lg flex p-[1em] flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="text-[2em] font-[Montserrat] font-bold">Cadastrar novo usuário</h1>
                    <Link href="/"><img src="/w3gLogo.png" alt="Logo W3G" className="w-20 h-10" /></Link>
                </div>
                <div className="flex justify-around mt-4">
                    {aviso && (
                        <div className={` ${aviso === "Erro" ? "bg-red-700" : "bg-green-700"} p-[1em] w-[50%] rounded-lg text-white`}>
                            <p className="font-bold">{aviso}:</p>
                            <p>{alerta}</p>
                        </div>
                    )}
                </div>
                <form className="flex flex-col gap-5 mt-[2em] items-center" onSubmit={enviarCadastro}>
                    <input id="nome" type="text" placeholder="Nome do usuário" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <input id="email" type="text" placeholder="E-mail" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <input id="senha" type="password" placeholder="Senha" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <input id="senhaConfirmada" type="password" placeholder="Confirme a senha" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <button type="submit" className="bg-[var(--azulw3)] py-[0.5em] px-[1em] rounded-md text-white font-semibold shadow-md hover:bg-[var(--azulw3-hover)] transition duration-300 ease-in-out cursor-pointer">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
