import axios from "axios";

const api = axios.create({
    headers: {'Access-Control-Allow-Origin': '*'},
    baseURL: 'http://10.0.2.2:3000'
})

export default api;