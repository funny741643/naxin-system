import {createStore} from 'vuex'
import login from './login/login.js'
import userInfo from './userInfo/userInfo'
import accredit from './accredit/accredit'
import interviewing from './userInfo/interviewing'
import interviewed from './userInfo/interviewed'
import appraise from './appraise/appraise'
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
        accredit,
        interviewing,
        interviewed,
        appraise
    }
})
export default store