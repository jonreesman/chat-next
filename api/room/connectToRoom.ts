import peakchat from '../api'
import { Room } from '../../types/room';
import { User } from '../../types/user';

export default async function ConnectToRoom(room: Room, user: User) {
    try {
        const response = await peakchat.get(`/api/rooms/room/`, {
            params: {
                user_id: user.ID,
                room_id: room.ID
            }
        })
        return response.data.room_token
    } catch (error) {
        console.log("failed room handshake")
    }
}