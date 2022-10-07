import peakchat from '../api'
export default async function login(username: string, password: string) {
            return peakchat.post(`/api/auth/login`, {
                Identity: username,
                Password: password,
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err) 
            })
}