import {createStore} from 'vuex'
import login from './login/login.js'
console.log('login', login)
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
        login
    }
})
export default store