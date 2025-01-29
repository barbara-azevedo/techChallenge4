import api from "../../src/api"

export default async function getFastList() {
    let results = null
    try {
        const response = await api.get(`/post/all`);
        results = response.data
    } catch (error) {
        console.log('getFastList erro:  '+ error)
    }
    return results;
}