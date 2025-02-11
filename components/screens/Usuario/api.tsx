
import api from '@/app/api';
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
    } catch (error: any) {
        console.log('getUsersAll erro:  ' + error)
        let retorno: any = JSON.parse(JSON.stringify(error))
        results = retorno.status;
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
        let retorno: any = JSON.parse(JSON.stringify(error))
        results = retorno.status;
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

        const response = await api.put(`/user/update`, body, {
            headers: headers
        });
        results = response.status
    } catch (error) {
        console.log('postUserUpdate erro:  ' + error)
        let retorno: any = JSON.parse(JSON.stringify(error))
        results = retorno.status;
    }
    return results;
}