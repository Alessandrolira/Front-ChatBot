"use client";

import { useState, useEffect, useRef } from "react";
import Conversas from "./components/Conversas/Conversas";
import Mensagens from "./components/Mensagens/Mensagens";

export default function Home() {
  const baseUrl = "http://192.168.15.105:5001/gerarjson";
  const [dadosConversas, setDadosConversas] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        setDadosConversas(data.numeros || {});
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    fetchData();
  }, []);

  const mensagensSelecionadas = selectedNumber ? dadosConversas[selectedNumber]?.mensagens || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
      <div className="bg-(--cinza) w-full h-full rounded-lg flex">
        <div className="bg-(--cinza2) rounded-lg w-[28%] pt-[2em] pb-[1em] overflow-y-auto scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
          <h1 className="pl-[1em] text-[1.2em]">Agente IA - Consultor de Vendas</h1>
          <p className="text-[1.1em] pl-[1em] pt-[1.3em] pb-[1.3em]">Conversas em produção</p>

          {Object.entries(dadosConversas)
            .sort((a, b) => {
              const parseDate = (dataString) => {
                if (!dataString) return 0;
                const [dia, mes, anoHora] = dataString.split('/');
                const [ano, hora] = anoHora.split(' ');
                return new Date(`${ano}-${mes}-${dia}T${hora}`).getTime();
              };

              const ultimaMensagemA = parseDate(a[1].mensagens[a[1].mensagens.length - 1]?.data_hora);
              const ultimaMensagemB = parseDate(b[1].mensagens[b[1].mensagens.length - 1]?.data_hora);
              return ultimaMensagemB - ultimaMensagemA;
            })
            .map(([numero, dados]) => (
              <div key={numero} onClick={() => setSelectedNumber(numero)} className="cursor-pointer">
                <Conversas
                  nomeUser={dados.nome || "Usuário Desconhecido"}
                  ultima_mensagemUser={dados.mensagens[dados.mensagens.length - 1].mensagem}
                  dataUser={dados.mensagens[dados.mensagens.length - 1].data_hora}
                />
              </div>
            ))}
        </div>

        <div className="text-(--branco) w-[72%] rounded-lg flex flex-col relative">
          <div className="flex justify-end p-[2em]">
            <img src="/w3gLogo.png" alt="Logo da W3G" className="w-[80px] h-[70px] pb-[2.1em]" />
          </div>

          {selectedNumber && (
            <div>
              <Conversas nomeUser={dadosConversas[selectedNumber]?.nome || "Usuário Desconhecido"} numeroUser={selectedNumber}></Conversas>
            </div>
          )}

          <section className="h-[calc(100vh-2em-2em-70px-2em-3em-2em-1em)] overflow-y-auto relative">
            <div className="overflow-y-auto pt-[2em] p-[3em] scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
              {mensagensSelecionadas.length > 0 ? (
                mensagensSelecionadas.reduce((acc, mensagem, index, array) => {
                  const dataMensagem = mensagem.data_hora.split(' ')[0];
                  const dataAnterior = index > 0 ? array[index - 1].data_hora.split(' ')[0] : null;
                  
                  if (dataMensagem !== dataAnterior) {
                    acc.push(
                      <div key={`date-${dataMensagem}`} className="text-center text-gray border-y my-[2em] my-2">
                        {dataMensagem}
                      </div>
                    );
                  }

                  acc.push(
                    <Mensagens key={`msg-${index}`} nome={dadosConversas[selectedNumber]?.nome} usuario={true} data={mensagem.data_hora}>
                      {mensagem.mensagem}
                    </Mensagens>
                  );
                  acc.push(
                    <Mensagens key={`res-${index}`} usuario={false} data={mensagem.data_hora}>
                      {mensagem.resposta}
                    </Mensagens>
                  );
                  return acc;
                }, [])
              ) : (
                <p className="text-center text-gray-400">Selecione uma conversa para visualizar as mensagens</p>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <button onClick={scrollToBottom} className="fixed top-43.5 right-10 bg-(--cinza) text-white p-3 rounded-full shadow-lg hover:bg-(--branco) transition cursor-pointer">
              <img src="/arrow-down.png" alt="" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
