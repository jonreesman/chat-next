import Cookies from 'universal-cookie';

export default function saveToken(token: string) {
    const cookies = new Cookies();
    cookies.set("token", token, {path: '/', maxAge: 71 * 60 * 60})
}