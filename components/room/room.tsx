import React, { useContext, useEffect } from "react";
import { Stack } from "@mantine/core";
import createWebSocket from "../../api/createWebSocket";
import { userContext } from "../../hooks/userContext";
import MessageView from "./messageView";
import ChatInput from "./chatInput";
import { SendMessage } from "react-use-websocket"
import { Room } from '../../types/room';


type Props = {
  room: Room,
  roomToken: string,
};

type Websocket = {
  sendMessage: SendMessage,
  lastMessage: MessageEvent<any>,
  connectionState: string
}

const Room: React.FC<Props> = ({ room, roomToken }) => {
  const {user} = useContext(userContext);
  const [sendMessage, lastMessage, ] = createWebSocket(room, user, roomToken);
  useEffect(() => {
    console.log("re-render for WebSocket...")
  }, [room, user, roomToken])

  return (
    <Stack justify="flex-end" style={{ height: "100%", width: "100%" }}>
      <MessageView room={room} lastMessage={lastMessage} user={user} />
      <ChatInput sendMessage={sendMessage} />
    </Stack>
  );
};

export default Room;
