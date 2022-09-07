import peakchat from '../api'
import { Room } from '../../types/room'

export default async function DeleteRoom(room: Room) {
    return peakchat.delete(`/api/rooms/${room.ID}`, {})
    .then(response => {
        return response;
    })
    .catch(err => {
        console.log(err) 
    })
}