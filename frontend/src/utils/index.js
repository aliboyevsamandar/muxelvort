import axios from 'axios';

let baseURL = `http://localhost:2000/api`

export const $api = axios.create({
    baseURL: baseURL,
})