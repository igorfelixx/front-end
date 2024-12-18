import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://dev.digitro.com", {
  path: "/callcontrol",
  reconnectionDelayMax: 10_000,
  forceNew: true,
});

export const UseChat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
    });

    const user_connected = socket.emit("USER_CONNECT", {
      username: "Igor",
      maxCalls: 10,
    });

    if (user_connected.connected === false) {
      //Erro de conexão do usuario
      socket.on("USER_CONNECTION_ERROR", (data) => {
        console.error("USER_CONNECTION_ERROR:", data.error);
        console.log("Erro ao conectar usuario");
      });
    }

    socket.on("USER_CONNECTED", (user) => {
      console.log("Usuario " + user.username + " conectado com sucesso");
    });

    socket.on("NEW_CALL", (call) => {
      setMessages((prevMessages) => {
        const isMessage = prevMessages.find(
          (messages) => messages.callId === call.callId
        );

        if (isMessage) {
          return prevMessages;
        }

        return [...prevMessages, call];
      });
    });

    socket.on("CALL_ENDED", (callId) => {
      setMessages((prev) => {
        const updatedCalls = prev.filter((call) => call.callId !== callId);

        return updatedCalls;
      });
      console.log("Chamada encerrada");
    });

    socket.on("END_CALL_ERROR", (error) => {
      console.error("END_CALL_ERROR:", error);
      console.log("Erro ao finalizar chamada");
    });

    //O argumento tem que ser um array
    socket.on("CALLS_LIST", (callsList) => {
      setMessages(callsList);
      console.log(callsList);
    });

    socket.on("disconnect", () => {
      console.log("Socket desconectado");
    });

    socket.emit("GET_CALLS");

    return () => {
      socket.off("message");
      socket.off("connect");
    };
  }, []);

  function list(index, msg) {
    return <li key={index}>{msg.caller}</li>;
  }

  function disconnect() {
    if (socket) {
      socket.emit("USER_DISCONNECT");
      socket.disconnect();

      setMessages([]);
    }
  }

  function endCall(callId) {
    if (socket) {
      socket.emit("END_CALL", callId);
      socket.emit("GET_CALLS");
    }
  }

  const component = (
    <div>
      <h1>Chat em tempo real</h1>
      <div>
        <h2>Mensagens:</h2>
        <ul>{messages.map((msg, index) => list(index, msg))}</ul>
      </div>
    </div>
  );

  return { component, disconnect, endCall };
};
