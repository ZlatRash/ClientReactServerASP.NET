import axios from "axios";
import {AuthResponse} from "../../entity/GlobalTypes";

export const api_url = "https://localhost:7210";

const $api = axios.create({
    withCredentials: true,
    baseURL: api_url
})
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $api.get<AuthResponse>('/refresh', {withCredentials: true})
            localStorage.setItem('token', response.data.token);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;

