import Cookies from 'universal-cookie';
import setAuthToken from './setAuthToken';
import { User } from '../../types/user';

export default function Logout(setUser: React.Dispatch<React.SetStateAction<User>>) {
    const cookies = new Cookies();
    setUser(null);
    setAuthToken(null);
    cookies.remove("token")
}