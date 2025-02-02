import api from "../../../src/api"

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

export async function getFastListSearch({searchPost}: {searchPost: any}) {
    let results = null
    try {
        const response = await api.get(`/post/findSearch/${searchPost}`);
        results = response.data
    } catch (error) {
        console.log('getFastList erro:  '+ error)
    }
    return results;
}