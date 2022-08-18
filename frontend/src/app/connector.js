import axios from 'axios';
import { clearUser } from '../features/loginSlice';

let store;
export const injectStore = _store => {
    store = _store
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: { 'Accept': 'application/json' }
})

axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        store.dispatch(clearUser());
    }
    return Promise.reject(error);
});

export default axiosInstance;
