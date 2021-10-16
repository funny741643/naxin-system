import {createStore} from 'vuex'
import login from './login/login.js'
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
        appraise
    }
})
export default store