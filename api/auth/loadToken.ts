import Cookies from 'universal-cookie';
import setAuthToken from './setAuthToken'

export default function loadToken() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token === undefined) {
        console.log("no token found")
        return
    }
    setAuthToken(token)
    return token
}