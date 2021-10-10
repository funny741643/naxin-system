// import {Module} from 'vuex'
import axios from 'axios'
const interviewed = {
    namespace:true,
    state: () => {
        return {
            userInfoed:[],
            usertotaled:''
        }
    },
    mutations: {
        // 修改state中的值
        changeUserInfoed(state,userInfoed){
            state.userInfoed = userInfoed
        },
        changeUsertotaled(state,usertotaled){
            state.usertotaled = usertotaled
        }
       
    },
    getters: {},
    actions: {
        UserInfoedAcction({commit},payload){
          console.log('开始请求信息')
        //   请求用户信息
          axios.get(`/interviewed?pagesize=${payload.pagesize}&pagenum=${payload.pagenum}`,payload).then((res)=>{
              if(res.status === 200){
                const userInfoed = res.list
                const usertotaled = res.total
                  commit("changeUserInfoed",userInfoed)
                  commit("changeUsertotaled",usertotaled)
              }
              
          })
      }
        
    }
}

export default interviewed