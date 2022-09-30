import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { Room } from '../types/room';
import { User } from '../types/user';

export default function createWebSocket(room: Room, user: User, token: string): [SendMessage, MessageEvent<any>, string] {
    console.log(token)
    const { sendMessage, lastMessage, readyState } = useWebSocket((process.env.NEXT_PUBLIC_SITE_SECURE === "true" ? `wss://` : `ws://`) + process.env.NEXT_PUBLIC_SITE_URL + `/api/rooms/room/${room.ID}`, { 
            queryParams: {"user_id": user.ID, "username": user.Username, "room_token": token}
    });
    const connectionState = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
    return [sendMessage,
            lastMessage, 
            connectionState];
}