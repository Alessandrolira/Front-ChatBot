

import Conversas from "./components/Conversas/Conversas";
import Mensagens from "./components/Mensagens/Mensagens";


export default async function Home() {

  const baseUrl = "http://localhost:5001/gerarjson"

  const data = await fetch(baseUrl)
  const dadosConversas = await data.json()

  // console.log(dadosConversas)

  console.log(dadosConversas)

  return (
    <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
      <div className="bg-(--cinza) w-full h-full rounded-lg flex">
        <div className="bg-(--cinza2) rounded-lg w-[28%] pt-[2em] pb-[1em] overflow-y-auto scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
          <h1 className="pl-[1em] text-[1.2em]">Agente IA - Consultor de Vendas</h1>
          <p className="text-[1.1em] pl-[1em] pt-[1.3em] pb-[1.3em]">Conversas em produção</p>

          {Object.entries(dadosConversas.numeros)
          .sort((a, b) => {
            const ultimaMensagemA = a[1].mensagens?.[a[1].mensagens.length - 1]?.data || 0;
            const ultimaMensagemB = b[1].mensagens?.[b[1].mensagens.length - 1]?.data || 0;
            return new Date(ultimaMensagemB).getTime() - new Date(ultimaMensagemA).getTime();
          })
          .map(([numero, dados], index) => (
            <Conversas 
              key={index}
              nomeUser={dados.nome || "Usuário Desconhecido"} 
              ultima_mensagemUser={
                dados.mensagens?.length > 0 
                  ? dados.mensagens[dados.mensagens.length - 1].mensagem 
                  : "Sem mensagens"
              } 
              dataUser={
                dados.mensagens?.length > 0
                  ? dados.mensagens[dados.mensagens.length - 1].data
                  : "Sem data"
              }
            />
        ))}



        </div>
        <div className="text-(--branco) w-[72%] rounded-lg ">
          <div className="flex justify-end p-[2em]">
            <img src="/w3gLogo.png" alt="Logo da W3G" className="w-[80px] h-[70px] pb-[2.1em]" />
          </div>
            <Conversas nomeUser="Henrique Souza" numeroUser={5511988233222}/>
          <section className="h-[calc(100vh-2em-2em-70px-2em-3em-2em-1em)] overflow-y-auto">
            <div className="overflow-y-auto pt-[2em] p-[3em] scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
              <Mensagens nome="Alessandro Lira" usuario={true}>Olá, tudo bem, poderia me informar os valores dos planos</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={false}>Claro, posso ajudar com isso! Para informar os valores dos planos de saúde, preciso saber a sua idade. Você poderia me informar? Assim, consigo fornecer os preços mais precisos para você.</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={true}>58</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={false}>Para um cliente de 58 anos, os preços dos planos da Medsenior são os seguintes: 
              - Medsênior Essencial [E]: R$ 836,92
              - Medsênior SP1 [E]: R$ 1.080,98
              - Medsênior SP2 [A]: R$ 1.254,64
              - Medsênior Black 4 [A]: R$ 1.447,11

              Espero que essas informações sejam úteis! Se tiver mais alguma dúvida ou quiser discutir algum plano em especial, estou aqui para ajudar.</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={true}>58</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={true}>58</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={true}>58</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={true}>58</Mensagens>
              <Mensagens nome="Alessandro Lira" usuario={true}>58</Mensagens>
            </div>
          </section>
        </div>  
      </div>
    </div>
  );
}
