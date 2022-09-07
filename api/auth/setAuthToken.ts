import peakchat from '../api'
 
export default function setAuthToken(token: string | null) {
   if (token) {
    peakchat.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete peakchat.defaults.headers.common["Authorization"];
}