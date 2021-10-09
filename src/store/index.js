import {createStore} from 'vuex'
import login from './login/login.js'
import userInfo from './userInfo/userInfo'
import accredit from './accredit/accredit'
const store = createStore({
    state:()=>{
        return {
           name:'aaa',
           password:'1111'
        }
    },
    mutations:{},
    getters:{},
    actions:{},
    modules:{
        login,
        userInfo,
        accredit
    }
})
export default store