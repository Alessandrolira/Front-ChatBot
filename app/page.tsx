"use client";

import Link from "next/link";

const meuIp = "192.168.19.40:5001"

const enviarDados = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const senha = formData.get("senha");

    console.log(email)
    console.log(senha)

    const response = await fetch(`http://${meuIp}/autenticarLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify({ "email" : email, "senha" : senha })
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Login bem-sucedido:", data);
    } else {
        alert(data.message || "Email ou senha incorretos")
    }
}
    

export default function Login() {
    return (
        <div className="h-screen w-screen bg-[url('/background-login.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center">
            <div className="bg-[#373737] w-[40%] flex flex-col items-center justify-center p-[3em] rounded-lg shadow-lg shadow-black/30 z-10 relative inset-shadow-sm inset-shadow-black/30">
                <div className="flex flex-row items-center">
                    <img src="/detalhe-logo.png" alt="" className="w-[7em] mr-[-2em] z-0" />
                    <img src="/w3gLogo.png" alt="Logo W3G" className="py-[2em] px-[1.5em] bg-[#2B2B2B] w-[7em] rounded-lg shadow-lg shadow-black/30 z-10 relative inset-shadow-sm inset-shadow-black/30"
                    />
                    <img src="/detalhe-logo.png" alt="" className="w-[7em] ml-[-2em] z-0" />
                </div>
                <h1 className="font-bold text-[#6B6B6B] text-[1.5em]">Bem vindo de volta!</h1>
                <p className="text-[#6B6B6B] text-[0.8em]">não possui conta? faça o <Link href="cadastrarUsuario" className="text-(--branco)">cadastro</Link></p>
                <form action="" className="w-full mt-[2em] flex flex-col items-center" onSubmit={enviarDados}>
                    <div className="relative w-full">
                        <img src="/mail.png" alt="Ícone de email" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
                        <input type="text" placeholder="Digite seu email..." className="bg-[#2B2B2B] w-full rounded-md py-[0.5em] pl-10 pr-[0.5em] text-[0.8em] font-bold text-[#6B6B6B] placeholder:text-[#6B6B6B] outline-none shadow-md shadow-black/30" id="email" name="email"/>
                    </div>
                    <div className="relative w-full mt-[1em] mb-[1em]">
                        <img src="/mail.png" alt="Ícone de email" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
                        <input type="password" placeholder="Digite sua senha..." className="bg-[#2B2B2B] w-full rounded-md py-[0.5em] pl-10 pr-[0.5em] text-[0.8em] font-bold text-[#6B6B6B] placeholder:text-[#6B6B6B] outline-none shadow-md shadow-black/30" id="senha" name="senha"/>
                    </div>
                    <div className="flex justify-end items-end w-full">
                        <p className="text-[#6B6B6B] text-[0.8em]">Esqueceu a sua senha? <Link href="#" className="text-(--branco)">Redefinir</Link></p>
                    </div>
                    <button className="bg-[var(--azulw3)] mt-[2em] py-[0.5em] px-[1em] rounded-md text-white font-semibold shadow-md shadow-black/30 cursor-pointer hover:bg-[var(--azulw3-hover)] transition duration-300 ease-in-out inset-shadow-sm inset-shadow-black/30">
                        Entrar
                    </button>
                    <Link href="/mensagensRecebidas">Entrar no sistema de mensagens</Link>
                </form>
            </div>
        </div>
    )
}
