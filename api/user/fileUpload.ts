import peakchat from '../api';
import { User } from '../../types/user';

export default async function FileUpload(file, id): Promise<User>{
    const formData = new FormData();
    formData.append("image", file, file.name)
    return peakchat.post(`/uploads/avatar`, formData, {headers: {'Content-Type': 'multipart/form-data'}, params: {'id': id}, withCredentials: true})
    .then(response => {
        const {data} = response;
        const user: User = {
            AvatarURL: data.data.AvatarURL,
            DisplayName: data.data.DisplayName,
            ID: data.data.ID,
            Username: data.data.Username,
        }
        return user;
    })
    .catch(err => {
        console.log(err) 
        throw(err)
    })
}