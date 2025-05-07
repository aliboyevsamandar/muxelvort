import axios from 'axios';

let baseURL = `https://muxelvort.onrender.com/api`

export const $api = axios.create({
    baseURL: baseURL,
})