// import {Module} from 'vuex'
import axios from 'axios'
const interviewing = {
    namespace:true,
    state: () => {
        return {
            userInfoing:[],
            usertotaling:''
        }
    },
    mutations: {
        // 修改state中的值
        changeUserInfoing(state,userInfoing){
            state.userInfoing = userInfoing
        },
        changeUsertotaling(state,usertotaling){
            state.usertotaling = usertotaling
        }
       
    },
    getters: {},
    actions: {
        UserInfoingAcction({commit},payload){
          console.log('开始请求信息')
        //   请求用户信息
          axios.get(`/interviewing?pagesize=${payload.pagesize}&pagenum=${payload.pagenum}`,payload).then((res)=>{
              if(res.status === 200){
                  const userInfoing = res.list
                  const usertotaling = res.total
                //   const {userInfoing,usertotaling} = res
                  commit("changeUserInfoing",userInfoing)
                  commit("changeUsertotaling",usertotaling)
              }
              
          })
      }
        
    }
}

export default interviewing