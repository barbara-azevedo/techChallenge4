import api from "@/app/api";
import SessionStorage from 'react-native-session-storage';

export default async function getToken({ email, senha }: { email: any, senha: any }) {
    let results = null
    try {
        const response = await api.post(`/user/token`, { email: email, senha: senha });
        results = response.data
        SessionStorage.setItem('@token', results.token);
        await findOneUser({ email: email, senha: senha });
        results = response.data
    } catch (error) {
        console.log('getFastList erro:  ' + error)
    }
    return results;
}

export async function findOneUser({ email, senha }: { email: any, senha: any }) {
    try {
        let jwtStr = SessionStorage.getItem('@token');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const body = { email, senha }
        const response = await api.post(`/user/findOne`, body, {
            headers: headers
        });
        let results = response.data.findUser
        SessionStorage.setItem('@usuarioLogado', results)
    } catch (error) {
        console.log('getFastList erro:  ' + error)
    }
}