import peakchat from '../api';
import { User } from '../../types/user';

const updateUserDisplayName = (id: string, name: string): Promise<User> => {
    return peakchat.patch(`api/client/${id}`, {
        DisplayName: name,
    }, { params: { "id": id}})
    .then(response => {
        const { data } = response.data;
        console.log(data)
        if (response === null) {
            console.log("Update name response was null.")
            return;
        }
        const user: User = {
            AvatarURL: data.AvatarURL,
            DisplayName: data.DisplayName,
            ID: data.ID,
            Username: data.Username,
        }
        console.log(user)
        return user;
    })
    .catch(err => {
        console.log(err)
        throw(err)
    })
}

export default updateUserDisplayName;