import axios from 'axios';
import TokenServe from '../token';

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = TokenServe.getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        return config;
    },
    error => {
        Promise.reject(error)
    });
