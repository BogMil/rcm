import axios from 'axios';

export async function create(url, rowData) {

    console.log(url);
    return axios.post(url, rowData)
}

export async function get(url) {
    return axios.get(url)
}

export async function refresh(url) {
    return axios.get(url);
}

export async function del(baseUrl, id) {
    let url = baseUrl + "?id=" + id;
    return axios.delete(url);
}
