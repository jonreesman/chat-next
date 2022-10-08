//import Cookies from 'universal-cookie';
import peakchat from '../api'
//import setAuthToken from './setAuthToken';
import { User } from '../../types/user';

export default async function Logout(setUser: React.Dispatch<React.SetStateAction<User>>) {
    return peakchat.get(`/api/auth/logout`, {})
    .then(response => {
        //const cookies = new Cookies();
        setUser(null);
        //setAuthToken(null);
        //cookies.remove("token")
        return response;
    })
    .catch(err => {
        console.log(err) 
    })
}