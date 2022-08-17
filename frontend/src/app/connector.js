import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: { 'Accept': 'application/json' }
})

axios.interceptors.request.use(function (config) {
    console.log('before request');
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    console.log('before response');
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
