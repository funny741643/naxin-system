// import {Module} from 'vuex'
import axios from 'axios'
const userInfoModule = {
    namespace:true,
    state: () => {
        return {
            userInfo:''
        }
    },
    mutations: {
        // 修改state中的值
        changeUserInfo(state,userInfo){
            state.userInfo = userInfo
        }
       
    },
    getters: {},
    actions: {
        UserInfoAcction({commit},payload){
          console.log('开始请求信息')
        //   请求用户信息
          axios.get('/api/user').then((res)=>{
              console.log(res)
              const userInfo = res
              commit('userInfo',userInfo)
          })
      }
        
    }
}

export default userInfoModule