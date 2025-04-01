import Conversas from "./components/Conversas/Conversas";

export default function Home() {
  return (
    <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
      <div className="bg-(--cinza) w-full h-full rounded-lg flex">
        <div className="bg-(--cinza2) rounded-lg w-[28%] pt-[2em] pb-[1em] overflow-y-auto scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
          <h1 className="pl-[1em] text-[1.2em]">Agente IA - Consultor de Vendas</h1>
          <p className="text-[1.1em] pl-[1em] pt-[1.3em] pb-[1.3em]">Conversas em produção</p>
          <Conversas nome="Ivan Moré" ultima_mensagem="Olá, gostaria de saber sobre a IA"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
          <Conversas nome="Henrique Souza" ultima_mensagem="Toma essa ultima mensagem"/>
        </div>
        <div className="text-(--branco) w-[72%] rounded-lg">
          <div className="flex justify-end p-[2em]">
            <img src="/w3gLogo.png" alt="Logo da W3G" className="w-[80px] pb-[2.1em]" />
          </div>
            <Conversas nome="Henrique Souza"/>
          <div className="overflow-y-auto bg-(--amarelo)">
            olá
          </div>
        </div>  
      </div>
    </div>
  );
}
