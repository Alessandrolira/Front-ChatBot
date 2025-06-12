"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Conversas from "@/app/components/Conversas/Conversas";
import Mensagens from "@/app/components/Mensagens/Mensagens";
import { io, Socket } from "socket.io-client";
import Link from "next/link";

export default function Home() {

  const meuIp = "localhost:5001"

  const [isChecked, setIsChecked] = useState(true)
  const [socket, setSocket] = useState<Socket | null>(null);
  const [resposta, setResposta] = useState("");
  const [dadosConversas, setDadosConversas] = useState<any>({});
  const [dadosConversasBD, setDadosConversasBD] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

      async function fetchDataBD() {
        try {
          const baseUrlBD = `http://${meuIp}/buscarMensagens`;
          const response = await fetch(baseUrlBD);
          const data = await response.json();
          // console.log("Dados recebidos do Banco de dados:", data);
          setDadosConversasBD(data.numeros || {});

        } catch (error) {
          console.error("Erro ao buscar os dados:", error);
        }
      }
      fetchDataBD();
    }, [selectedNumber, resposta]); // Esse useEffect só é disparado quando selectedNumber for alterado

  useEffect(() => {

    if (selectedNumber == null) {

    } else {

      async function ResponsavelNumero() {
        const response = await fetch(`http://${meuIp}/Responsavel/${selectedNumber}`)
        const data = await response.json();

        console.log("Dados recebidos da API telefone:", data.Responsavel);

        if (data.Responsavel) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      }

      ResponsavelNumero();

    }

  }, [selectedNumber, resposta]);

  useEffect(() => {

    const socketIo = io(`http://${meuIp}`);
    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
    });

    socketIo.on("connect_error", (err) => {
      console.error("Erro de conexão:", err);
    });

    socketIo.on("mensagem", (data) => {
      console.log("Recebido do backend via WebSocket:", data);
      setResposta(data.resposta); // exemplo de ação
    });

    return () => {
      socketIo.disconnect();
    };

  }, []);

  const handleRequest = (e: any) => {
    const checked = e.target.checked
    setIsChecked(checked)
    let valor = 1

    if (checked == true) {
      valor = 1
    } else {
      valor = 0
    }

    async function AlterarResponsavel() {
      try {
        const response = await fetch(`http://${meuIp}/AlterarResponsavel/${selectedNumber}/${valor}`)
      } catch (error) {
        console.error("Erro ao alterar o responsável:", error);
      }
    }
    AlterarResponsavel();
  }

  const handleMessages = (nome_cliente: string) => {
    const inputMensagem = (document.getElementById("inputMensagem") as HTMLInputElement)

    async function EnviandoMensagem(mensagem: string) {
      const response = await fetch(`http://${meuIp}/EnviarMensagem/${selectedNumber}/${nome_cliente}/${mensagem}`)
      inputMensagem.value = ""
      return response
    }

    EnviandoMensagem(inputMensagem.value)
  }

  const baseUrlBD = `http://${meuIp}/buscarMensagens`

  const mensagensSelecionadasBD = selectedNumber ? dadosConversasBD[selectedNumber]?.mensagens || [] : [];

  const scrollToBottom = () => {
    ''
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagensSelecionadasBD]);

  return (
    <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
      <div className="bg-(--cinza) w-full h-full rounded-lg flex">
        <div className="bg-(--cinza2) rounded-lg w-[28%] pt-[2em] pb-[1em] overflow-y-auto scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
          <h1 className="pl-[1em] text-[1.2em]">Agente IA - Consultor de Vendas</h1>
          <p className="text-[1.1em] pl-[1em] pt-[1.3em] pb-[1.3em]">Conversas em produção</p>
          {Object.entries(dadosConversasBD)
            .sort((a: any, b: any) => {
              const parseDate = (dataString: any) => {
                if (!dataString) return 0;
                const [dia, mes, anoHora] = dataString.split('/');
                const [ano, hora] = anoHora.split(' ');
                return new Date(`${ano}-${mes}-${dia}T${hora}`).getTime();
              };

              const ultimaMensagemA = parseDate(a[1].mensagens[a[1].mensagens.length - 1]?.data_hora);
              const ultimaMensagemB = parseDate(b[1].mensagens[b[1].mensagens.length - 1]?.data_hora);
              return ultimaMensagemB - ultimaMensagemA;
            })
            .map(([numero, dados]: any) => (
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
          <div className="flex justify-end p-[2em] items-center">
            <Link href="/usuario"><div className="ml-[2em] rounded-full w-[3em] h-[3em] bg-(--background) mr-[2em] flex items-center justify-center shadow-lg shadow-black cursor-pointer transition duration-300 ease-in-out inset-shadow-sm inset-shadow-black/30 hover:bg-[var(--azulw3-hover)]">
              <img src="/user.png" alt="Usuarios" className="p-3" />
            </div></Link>
            <img src="/w3gLogo.png" alt="Logo da W3G" className="w-[80px] h-[40px]" />
          </div>

          {selectedNumber && (
            <div>
              <Conversas nomeUser={dadosConversasBD[selectedNumber]?.nome || "Usuário Desconhecido"} numeroUser={selectedNumber} numeroSelecionado={selectedNumber} funcaoScroll={scrollToBottom} checkado={isChecked} funcaoCheck={handleRequest}></Conversas>
            </div>
          )}
          <section className="h-[calc(100vh-2em-2em-3em-2em-1em)] overflow-y-auto relative">
            <div className="overflow-y-auto pt-[2em] p-[3em] scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
              {mensagensSelecionadasBD.length > 0 ? (
                mensagensSelecionadasBD.reduce((acc: any, mensagem: any, index: any, array: any) => {
                  const dataMensagem = mensagem.data_hora.split(' ')[0];
                  const dataAnterior = index > 0 ? array[index - 1].data_hora.split(' ')[0] : null;

                  if (dataMensagem !== dataAnterior) {
                    acc.push(
                      <div key={`date-${dataMensagem}`} className="text-center text-gray border-y my-[2em]">
                        {dataMensagem}
                      </div>
                    );
                  }
                  acc.push(
                    <Mensagens key={`msg-${index}`} nome={dadosConversasBD[selectedNumber]?.nome} data={mensagem.data_hora} responsavel={mensagem.responsavel}>
                      {mensagem.mensagem}
                    </Mensagens>
                  );
                  return acc;
                }, [])

              ) : (
                <p className="text-center text-gray-400">Selecione uma conversa para visualizar as mensagens</p>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            {isChecked == false ? (
              <div className="flex sticky bottom-1 pb-[1em] pt-[1em] z-10 w-full pr-[1em]">
              <textarea
                id="inputMensagem"
                placeholder="Escreva a mensagem aqui..."
                className="w-full rounded-2xl ml-2 p-3 resize-none overflow-auto max-h-[4.5rem] bg-[var(--background)]"
                rows={1}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleMessages(dadosConversas[selectedNumber]?.nome);
                  }
                }}
              ></textarea>
                <button onClick={() => handleMessages(dadosConversas[selectedNumber]?.nome)} className="text-[0.8em] bg-[#5fdd54] text-black rounded-2xl ml-2">Enviar Mensagem</button>
              </div >
            ) : (
              " "
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
