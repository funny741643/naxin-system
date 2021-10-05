import {Module} from 'vuex'
import router from '../../router'
import {get,post} from '../../service/request'
import localCache from '../../utils/cache'
const loginModule = {
    namespace:true,
    state: () => {
        return {
            token: '',
            userInfo: {}
        }
    },
    mutations: {
        // 修改state中的值
        changeToken(state,token){
            state.token = token
        }
    },
    getters: {},
    actions: {
        accoutLoginAction(payload){
            console.log('执行accoutLoginAction',payload)
            //登录逻辑，获取请求的返回值,
            const loginres = payload => post("api/login", payload)
            console.log(loginres.data)
            const {id,token} = loginres.data
            commit('changeToken',token)
            localCache.setCache('token', token)
            // 路由跳转
            router.push('/home')
        }
        
    }
}

export default loginModule