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
        changeAdmin_name(state, admin_name){
            state.admin_name = admin_name
        },
        changeAdmin_num(state, admin_num){
            state.admin_num = admin_num
        }
    },
    getters: {},
    actions: {
        accoutLoginAction({
            commit
        }, payload) {
            //登录逻辑，获取请求的返回值,
            console.log('accoutLoginAction')
            axios.post("api/admin/login", payload).then((res) => {
            // axios.post("/api/admin/login", payload).then((res) => {
                console.log(res)
                if (res.status !== 200 && res.status === 1003) {
                    ElMessage.warning({
                        message: '管理员不存在，该学号未注册',
                        type: 'warning',
                        duration: 2000
                    })

                    console.log("管理员不存在，该学号未注册")
                } else if (res.status === 200) {
                    const token = res.token
                    commit('changeToken', token)
                    commit('changeAdmin_name',payload.admin_name)
                    commit('changeAdmin_num',payload.admin_num)
                    localCache.setCache('token', token)
                    localCache.setCache('admin_name',payload.admin_name)
                    localCache.setCache('admin_num',payload.admin_num)
                    console.log(localCache.getCache('admin_num'))
                    // token缓存后要刷新页面
                    window.location.href = "/"
                   
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
            axios.post("api/admin/regist", payload).then((res) => {
                console.log('register')
                if (res.status === 1001) {
                    //提示框
                    console.log('该用户已存在')
                    ElMessage.warning({
                        message: '该用户已存在，请重新注册',
                        type: 'warning',
                        duration: 5000
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