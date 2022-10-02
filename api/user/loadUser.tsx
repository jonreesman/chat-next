import jwt from 'jwt-decode';
import peakchat from '../api';
import {User} from '../../types/user'

export default async function loadUser(): Promise<User> {
    return peakchat.get(`/api/client/`)
    .then(response => {
        const terseResponse = response.data.data
        const user: User = {
            Username: terseResponse.Username,
            AvatarURL: terseResponse.AvatarURL,
            DisplayName: terseResponse.DisplayName,
            ID: terseResponse.ID
        }
        return user
    })
}