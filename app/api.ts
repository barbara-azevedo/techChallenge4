import axios from "axios";

const api = axios.create({
    headers: {'Access-Control-Allow-Origin': '*'},
    baseURL: 'http://192.168.0.102:3000'
})

export default api;