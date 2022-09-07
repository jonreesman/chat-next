import peakchat from '../api'

export default async function AddRoom(name: string) {
    return peakchat.post(`/api/rooms/`, {
        name: name
    })
    .then(response => {
        return response;
    })
    .catch(err => {
        console.log(err) 
    })
}