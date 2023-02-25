// Set config defaults when creating the instance
import axios, {AxiosInstance} from "axios";

const myAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

// myAxios.defaults.withCredentials=true; //配置为true

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log("发请求啦", config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log("收到响应", response)
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirectUrl=${redirectUrl}`
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;
