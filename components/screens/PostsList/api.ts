import SessionStorage from "react-native-session-storage";
import api from "../../../app/api"

export default async function getFastList() {
    let results = null
    try {
        const response = await api.get(`/post/all`);
        results = response.data
    } catch (error) {
        console.log('getFastList erro:  ' + error)
    }
    return results;
}

export async function getFastListSearch({ searchPost }: { searchPost: any }) {
    let results = null
    try {
        const response = await api.get(`/post/findSearch/${searchPost}`);
        results = response.data
    } catch (error) {
        console.log('getFastList erro:  ' + error)
    }
    return results;
}

export async function getFastListAutor() {
    let results = null
    try {
        const response = await api.get(`/autor/all`);
        results = response.data
    } catch (error) {
        console.log('getFastList erro:  ' + error)
    }
    return results;
}

export async function postUpdate({ _id, titulo, conteudo, relationAutorId }: { _id: any, titulo: any, conteudo: any, relationAutorId: any }) {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const body = { titulo, conteudo, relationAutorId }

        const response = await api.put(`/post/update/${_id}`, body, {
            headers: headers
        });
        results = response.status
    } catch (error) {
        console.log('postUpdate erro:  ' + error)
        let retorno: any = JSON.parse(JSON.stringify(error))
        results = retorno.status;
    }
    return results;
}

export async function postSave({ titulo, conteudo, relationAutorId }: { titulo: any, conteudo: any, relationAutorId: any }) {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const body = { titulo, conteudo, relationAutorId }
        console.log(body)
        const response = await api.post(`/post/create`, body, {
            headers: headers
        });
        results = response.status
    } catch (error) {
        console.log('postSave erro:  ' + error)
        let retorno: any = JSON.parse(JSON.stringify(error))
        results = retorno.status;
    }
    return results;
}

export async function postRemove({ _id }: { _id: any }) {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const response = await api.delete(`/post/remove/${_id}`, {
            headers: headers
        });
        results = response.status
    } catch (error) {
        console.log('postUpdate erro:  ' + error)
        let retorno: any = JSON.parse(JSON.stringify(error))
        results = retorno.status;
    }
    return results;
}