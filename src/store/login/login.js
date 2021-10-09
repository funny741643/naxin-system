// import {Module} from 'vuex'
import router from '../../router'
import {
    get,
    post
} from '../../service/request'
import localCache from '../../utils/cache'
import axios from 'axios'
const loginModule = {
    namespace: true,
    state: () => {
        return {
            token: '',
            admin: {
                name: '',
                num: '',
                password: ''
            }
        }
    },
    mutations: {
        // 修改state中的值
        changeToken(state, token) {
            state.token = token
        },

    },
    getters: {},
    actions: {
        accoutLoginAction({
            commit
        }, payload) {
            //登录逻辑，获取请求的返回值,
            axios.get("/api/users").then((res) => {
                console.log(res)
                const {token} = res.data
                commit('changeToken',token)
                localCache.setCache('token', token)
                // 路由跳转
                router.push('/home')
            })
        },
        registerFun({
            commit
        }, payload) {
            axios.get("/api/users", payload).then((res) => {
                if (res.status === 1001) {
                    //提示框
                    console.log('用户注册过')
                } else if (res.status === 200) {
                    console.log('success')
                }
            })
        }

    }
}

export default loginModule