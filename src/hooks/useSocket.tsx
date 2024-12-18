import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import useFormStorage from "./useFormStorage";

interface Call {
  callId: string;
  caller: string;
  media: string;
  service: string;
  startDate: string;
}

const socket: Socket = io("https://dev.digitro.com", {
  path: "/callcontrol",
  reconnectionDelayMax: 10_000,
  forceNew: true,
});

export const useSocket = () => {
  const [messages, setMessages] = useState<Call[]>([]);
  const { formData } = useFormStorage();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
    });

    socket.emit("USER_CONNECT", {
      username: formData.name,
      maxCalls: formData.maxCalls,
    });

    socket.on("USER_CONNECTED", (user: { username: string }) => {
      console.log("Usuário " + user.username + " conectado com sucesso");
    });

    socket.on("NEW_CALL", (call: Call) => {
      socket.emit("NEW_CALL_ANSWERED", { callId: call.callId });
      setMessages((prevMessages) => {
        const isMessage = prevMessages.find(
          (message) => message.callId === call.callId
        );

        if (isMessage) {
          return prevMessages;
        }

        return [...prevMessages, call];
      });
    });

    socket.on("CALL_ENDED", (callId: string) => {
      setMessages((prev) => prev.filter((call) => call.callId !== callId));
      console.log("Chamada encerrada");
    });

    socket.on("END_CALL_ERROR", (error: string) => {
      console.error("END_CALL_ERROR:", error);
      console.log("Erro ao finalizar chamada");
    });

    socket.on("CALLS_LIST", (callsList: Call[]) => {
      setMessages(callsList);
      console.log(callsList);
    });

    socket.on("disconnect", () => {
      console.log("Socket desconectado");
    });

    socket.emit("GET_CALLS");

    return () => {
      socket.off("connect");
      socket.off("USER_CONNECTED");
      socket.off("NEW_CALL");
      socket.off("CALL_ENDED");
      socket.off("END_CALL_ERROR");
      socket.off("CALLS_LIST");
      socket.off("disconnect");
    };
  }, [formData]);

  function disconnect(): void {
    if (socket) {
      socket.emit("USER_DISCONNECT");
      socket.disconnect();
      setMessages([]);
    }
  }

  function endCall(callId: string): void {
    if (socket) {
      socket.emit("END_CALL", { callId });
      setMessages((prevMessages) =>
        prevMessages.filter((item) => item.callId !== callId)
      );
    }
  }

  return { endCall, disconnect, messages };
};
