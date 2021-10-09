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
            admin_name: '',
            admin_num: ''
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
            axios.post("/api/users", payload).then((res) => {
                console.log(res)
                if (res.status !== 200 && res.status === 1003) {
                    console.log("管理员不存在，该学号未注册")
                } else if (res.status === 200) {
                    const token = res.token
                    commit('changeToken', token)
                    localCache.setCache('token', token)
                    // token缓存后要刷新页面
                    // 还未实现
                    // 路由跳转
                    router.push('/home')
                }
            })
        },
        registerFun({
            commit
        }, payload) {
            axios.post("/api/regist", payload).then((res) => {
                if (res.status === 1001) {
                    //提示框
                    console.log('该用户已存在')
                } else if (res.status === 200) {
                    // 提示用户登录
                    console.log('success')
                }
            })
        }

    }
}

export default loginModule