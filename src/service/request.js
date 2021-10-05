import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加请求拦截器
// service.interceptors.request.use(
//     function (config) {
//         // 在发送请求之前做些什么
            /* 给请求添加token   isloading动画 */
//         return config;
//     },
//     function (error) {
//         // 对请求错误做些什么
//         return Promise.reject(error);
//     }
// );


// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        if (typeof res.data !== 'object') {
            Toast.fail('服务端异常！')
            return Promise.reject(res)
        }
        if (res.data.resultCode != 200) {
            if (res.data.message) Toast.fail(res.data.message)
            return Promise.reject(res.data)
        }

        return res.data
})

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

export default axios