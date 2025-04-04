"use client";

import { useState, useEffect } from "react";
import Conversas from "./components/Conversas/Conversas";
import Mensagens from "./components/Mensagens/Mensagens";

export default function Home() {
  const baseUrl = "http://localhost:5001/gerarjson";
  const [dadosConversas, setDadosConversas] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

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

  return (
    <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
      <div className="bg-(--cinza) w-full h-full rounded-lg flex">
        {/* Lista de Conversas */}
        <div className="bg-(--cinza2) rounded-lg w-[28%] pt-[2em] pb-[1em] overflow-y-auto scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
          <h1 className="pl-[1em] text-[1.2em]">Agente IA - Consultor de Vendas</h1>
          <p className="text-[1.1em] pl-[1em] pt-[1.3em] pb-[1.3em]">Conversas em produção</p>

          {Object.entries(dadosConversas)
            .sort((a, b) => {
              // Converte "27/03/2025 13:31:00" para "2025-03-27T13:31:00"
              const parseDate = (dataString) => {
                if (!dataString) return 0; // Evita erros se a data estiver vazia ou undefined
                const [dia, mes, anoHora] = dataString.split('/');
                const [ano, hora] = anoHora.split(' ');
                return new Date(`${ano}-${mes}-${dia}T${hora}`).getTime();
              };

              const ultimaMensagemA = parseDate(a[1].mensagens[a[1].mensagens.length - 1]?.data_hora);
              const ultimaMensagemB = parseDate(b[1].mensagens[b[1].mensagens.length - 1]?.data_hora);

              console.log("Raw Data A:", a[1].mensagens[a[1].mensagens.length - 1]?.data_hora);
              console.log("Raw Data B:", b[1].mensagens[b[1].mensagens.length - 1]?.data_hora);
              console.log("Data A:", ultimaMensagemA, "Data B:", ultimaMensagemB);

              return ultimaMensagemB - ultimaMensagemA; // Ordena da mais recente para a mais antiga
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

        {/* Área de Mensagens */}
        <div className="text-(--branco) w-[72%] rounded-lg flex flex-col">
          <div className="flex justify-end p-[2em]">
            <img src="/w3gLogo.png" alt="Logo da W3G" className="w-[80px] h-[70px] pb-[2.1em]" />
          </div>

          {/* Exibir informações do contato selecionado */}
          {selectedNumber && (
            
            <div>
              <Conversas nomeUser={dadosConversas[selectedNumber]?.nome || "Usuário Desconhecido"} numeroUser={selectedNumber}></Conversas>
            </div>
          )}

          <section className="h-[calc(100vh-2em-2em-70px-2em-3em-2em-1em)] overflow-y-auto">
            <div className="overflow-y-auto pt-[2em] p-[3em] scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
              {mensagensSelecionadas.length > 0 ? (
                mensagensSelecionadas.map((mensagem, index) => (
                  <>
                    <Mensagens key={index} nome={dadosConversas[selectedNumber]?.nome} usuario={true} data={mensagem.data_hora}>
                      {mensagem.mensagem}
                    </Mensagens>
                    <Mensagens key={index + 1} usuario={false} data={mensagem.data_hora}>
                        {mensagem.resposta}
                    </Mensagens>
                  </>
                ))
              ) : (
                <p className="text-center text-gray-400">Selecione uma conversa para visualizar as mensagens</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
