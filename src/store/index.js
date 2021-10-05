import {createStore} from 'vuex'
import login from './login/login'
const store = createStore({
    state:()=>{
        return {
           name:'',
           password:''
        }
    },
    mutations:{},
    getters:{},
    actions:{},
    modules:{
        login
    }
})
export default store