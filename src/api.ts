import axios from "axios";

const api = axios.create({
    headers: {'Access-Control-Allow-Origin': '*'},
    baseURL: 'http://localhost:3000'
})

export default api;