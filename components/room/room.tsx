import React, { useContext, useEffect } from "react";
import { Stack, Text } from "@mantine/core";
import createWebSocket from "../../api/createWebSocket";
import { userContext } from "../../hooks/userContext";
import MessageView from "./messageView";
import ChatInput from "./chatInput";
import { SendMessage } from "react-use-websocket"
import { Room } from '../../types/room';
import RoomSkeleton from '../roomSkeleton';


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
  const [sendMessage, lastMessage, connectionState ] = createWebSocket(room, user, roomToken);
  useEffect(() => {
    console.log("re-render for WebSocket...")
  }, [room, user, roomToken])


  if (connectionState == 'Closed' || connectionState == 'Closing') {
    return (
      <>
        <Text>Connection Closed.</Text>
      </>
    )
  }

  return (
    <Stack justify="flex-end" style={{ height: "100%", width: "100%" }}>
      {connectionState == 'Open' ?
        <MessageView room={room} lastMessage={lastMessage} user={user} />
        :
        <RoomSkeleton />
      }

      <ChatInput sendMessage={sendMessage} />
    </Stack>
  );
};

export default Room;
