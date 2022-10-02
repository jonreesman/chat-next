import peakchat from '../api'
import setAuthToken from './setAuthToken'
import saveToken from './saveToken'
export default async function login(username: string, password: string) {
            return peakchat.post(`/api/auth/login`, {
                Identity: username,
                Password: password,
            })
            .then(response => {
                setAuthToken(response.data.token)
                saveToken(response.data.token)
                return response;
            })
            .catch(err => {
                console.log(err) 
            })
}