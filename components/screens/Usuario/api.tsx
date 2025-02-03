
import api from '@/src/api';
import SessionStorage from 'react-native-session-storage';

export default async function getUsersAll({ tipoAcesso }: { tipoAcesso: any }) {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const response = await api.get(`/user/all?tipoAcesso=` + tipoAcesso, {
            headers: headers
        });
        results = response.data
    } catch (error) {
        console.log('getUsersAll erro:  ' + error)
    }
    return results;
}

export async function postUserCreate({ email, senha, nome, tipoAcesso }: { email: any, senha: any, nome: any, tipoAcesso: any }) {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const body = { email, senha, tipoAcesso, nome }

        const response = await api.post(`/user/create`, body, {
            headers: headers
        });
        results = response.status
    } catch (error) {
        console.log('postUserCreate erro:  ' + error)
    }
    return results;
}

export async function postUserUpdate({ email, senha, nome, tipoAcesso }: { email: any, senha: any, nome: any, tipoAcesso: any }) {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const body = { email, senha, tipoAcesso, nome }

        const response = await api.post(`/user/update`, body, {
            headers: headers
        });
        results = response.status
    } catch (error) {
        console.log('postUserUpdate erro:  ' + error)
    }
    return results;
}