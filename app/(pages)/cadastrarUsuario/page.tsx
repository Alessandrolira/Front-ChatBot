"use client"

function enviarCadastro(event: React.FormEvent<HTMLFormElement>) {

    event?.preventDefault();

    const nome = document.querySelector('#nome') as HTMLInputElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const senha = document.querySelector('#senha') as HTMLInputElement;
    const confirmarSenha = document.querySelector('#confirmarSenha') as HTMLInputElement;

    const meuIp = "192.168.20.46:5001"

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

export default function CadastrarUsuario() {
    return (
        <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
            <div className="bg-(--cinza) w-full h-full rounded-lg flex p-[1em] flex-col">
                <h1 className="text-[2em] font-[Montserrat] font-bold">Cadastrar novo usuário</h1>
                <form className="flex flex-col gap-5 mt-[2em] items-center" onSubmit={enviarCadastro}>
                    <input id="nome" type="text" placeholder="Nome do usuário" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <input id="email" type="text" placeholder="E-mail" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <input id="senha" type="password" placeholder="Senha" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <input id="senhaConfirmada" type="password" placeholder="Confirme a senha" className="p-[0.5em] rounded-md border border-[#6B6B6B] w-100" />
                    <button type="submit" className="bg-[var(--azulw3)] py-[0.5em] px-[1em] rounded-md text-white font-semibold shadow-md shadow-black/30 cursor-pointer hover:bg-[var(--azulw3-hover)] transition duration-300 ease-in-out inset-shadow-sm inset-shadow-black/30">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
