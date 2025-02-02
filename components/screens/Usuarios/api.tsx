
import api from '@/src/api';
import SessionStorage from 'react-native-session-storage';

export default async function getUsersAll() {
    let results = null
    try {
        let jwtStr = SessionStorage.getItem('@token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtStr
        }
        const response = await api.post(`/user/all`, {
            headers: headers
        });
        results = response.data
    } catch (error) {
        console.log('getUsersAll erro:  ' + error)
    }
    return results;
}