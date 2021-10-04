import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

var loadinginstace;

var service = axios.create({
    // withCredentials: true, // 跨域请求是否携带cookie
    timeout: 5000,
    responseType: "json",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前加载Loading组件
        loadinginstace = ElLoading.service({ fullscreen: true })
        return config;
    },
    function (error) {
        loadinginstace.close();
        ElMessage.error({
            message: '网络不给力,请稍后再试'
        })
        return Promise.reject(error);
    }
);


// 添加响应拦截器
service.interceptors.response.use(res => {
    loadinginstace.close();
    if (typeof res.data !== 'object') {
        alert('服务端异常！')
        return Promise.reject(res)
    }
    if (res.status != 200) {
        if (res.data.message) {
            alert(res.data.message)
        }
        return Promise.reject(res.data)
    }

    return res.data
})

export default service