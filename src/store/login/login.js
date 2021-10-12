// import {Module} from 'vuex'
import router from '../../router'
import localCache from '../../utils/cache'
import axios from '../../service/request.js'
import {
    ElMessage
} from 'element-plus'
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
            console.log('accoutLoginAction')
            axios.post("http://192.168.1.121:3000/admin/login", payload).then((res) => {
            // axios.post("/api/admin/login", payload).then((res) => {
                console.log(res)
                if (res.status !== 200 && res.status === 1003) {
                    console.log("管理员不存在，该学号未注册")
                } else if (res.status === 200) {
                    const token = res.token
                    commit('changeToken', token)
                    localCache.setCache('token', token)
                    window.location.href = "/"
                    // token缓存后要刷新页面
                    // 还未实现
                    // 路由跳转
                    // router.push('/home')
                }
            })
        },
        // 注册逻辑
        registerFun({
            commit
        }, payload) {
            console.log('registerFun')
            axios.post("/api/regist", payload).then((res) => {
                console.log('register')
                if (res.status === 1001) {
                    //提示框
                    console.log('该用户已存在')
                    ElMessage.warning({
                        message: '该用户已存在，请重新注册',
                        type: 'warning',
                    })

                } else if (res.status === 200) {
                    // 提示用户登录
                    console.log('success')
                    ElMessage.success({
                        message: '注册成功，请登录',
                        type: 'success',
                    })
                }
            })
        }

    }
}

export default loginModule