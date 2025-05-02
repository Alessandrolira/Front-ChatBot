"use client";

import { useState, useEffect, useRef } from "react";
import Conversas from "./components/Conversas/Conversas";
import Mensagens from "./components/Mensagens/Mensagens";
import { io, Socket } from "socket.io-client";

export default function Home() {

  const [isChecked, setIsChecked] = useState(true)

  const handleRequest = (e:any) => {
    const checked = e.target.checked
    setIsChecked(checked)
    console.log(checked)
}


  const [socket, setSocket] = useState<Socket | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");

  const meuIp = "192.168.20.46:5001"

  const baseUrl = `http://${meuIp}/gerarjson`;

  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  useEffect(() => {
    const socketIo = io("http://localhost:5001");
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
      setMensagemEnviada(true); // força refresh no useEffect de fetch
    });
  
    return () => {
      socketIo.disconnect();
    };
  }, []);
  
  const [dadosConversas, setDadosConversas] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Após a execução do fetch, você reseta a mensagemEnviada para false
    setMensagemEnviada(false);

  }, [mensagemEnviada]);  // Esse useEffect só é disparado quando mensagemEnviada for true

  const mensagensSelecionadas = selectedNumber ? dadosConversas[selectedNumber]?.mensagens || [] : [];

  const scrollToBottom = () => {''
      if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };

  return (
    <div className="bg-(--preto) h-screen flex items-center justify-center p-[1em]">
      <div className="bg-(--cinza) w-full h-full rounded-lg flex">
        <div className="bg-(--cinza2) rounded-lg w-[28%] pt-[2em] pb-[1em] overflow-y-auto scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
          <h1 className="pl-[1em] text-[1.2em]">Agente IA - Consultor de Vendas</h1>
          <p className="text-[1.1em] pl-[1em] pt-[1.3em] pb-[1.3em]">Conversas em produção</p>

          {Object.entries(dadosConversas)
            .sort((a: any, b: any) => {
              const parseDate = (dataString:any) => {
                if (!dataString) return 0;
                const [dia, mes, anoHora] = dataString.split('/');
                const [ano, hora] = anoHora.split(' ');
                return new Date(`${ano}-${mes}-${dia}T${hora}`).getTime();
              };

              const ultimaMensagemA = parseDate(a[1].mensagens[a[1].mensagens.length - 1]?.data_hora);
              const ultimaMensagemB = parseDate(b[1].mensagens[b[1].mensagens.length - 1]?.data_hora);
              return ultimaMensagemB - ultimaMensagemA;
            })
            .map(([numero, dados]:any) => (
              <div key={numero} onClick={() => setSelectedNumber(numero)} className="cursor-pointer">
                <Conversas
                  nomeUser={dados.nome|| "Usuário Desconhecido"}
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
              <Conversas nomeUser={dadosConversas[selectedNumber]?.nome || "Usuário Desconhecido"} numeroUser={selectedNumber} numeroSelecionado={selectedNumber} funcaoScroll={scrollToBottom} checkado={isChecked} funcaoCheck={handleRequest}></Conversas>
            </div>
          )}
          <section className="h-[calc(100vh-2em-2em-3em-2em-1em)] overflow-y-auto relative">
            <div className="overflow-y-auto pt-[2em] p-[3em] scrollbar-thin scrollbar-thumb-[--cinza] scrollbar-track-[--preto]">
              {mensagensSelecionadas.length > 0 ? (
                mensagensSelecionadas.reduce((acc:any, mensagem:any, index:any, array:any) => {
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
            {isChecked == false ? (
                <div className="flex sticky bottom-1 pb-[1em] pt-[1em] z-10 w-full pr-[1em] bg-(--cinza)">
                  <input placeholder="Escreva a mensagem aqui..." className="w-full rounded-2xl ml-2 p-3 bg-(--background)"/>
                  <button className="text-[0.8em] bg-[#5fdd54] text-black rounded-2xl ml-2">Enviar Mensagem</button>
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
