// import {Module} from 'vuex'
import axios from 'axios'
const interviewed = {
    namespace:true,
    state: () => {
        return {
            userInfoed:[],
            usertotaled:'',
            appraise:'',
            evaluator:'',
            score:''
        }
    },
    mutations: {
        // 修改state中的值
        changeUserInfoed(state,userInfoed){
            state.userInfoed = userInfoed
        },
        changeUsertotaled(state,usertotaled){
            state.usertotaled = usertotaled
        },
        changeStudentAppraise(state,studentAppraise){
            state.appraise = studentAppraise
        },
        changeEvaluator(state,evaluator){
            state.evaluator = evaluator
        },
        changeScore(state,studentscore){
            state.score = studentscore
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
      },
    //查找考生评价和分数,评价人
      findUserMg({commit},payload){
          axios.get(``,payload).then(res=>{
              if(res.status === 200){
                const studentAppraise = res.appraise
                const evaluator = res.evaluator
                const studentscore = res.studentscore
                commit("changeStudentAppraise",studentAppraise)
                commit("changeEvaluator",evaluator)
                commit("changeScore",studentscore)
              }
          })
      }
        
    }
}

export default interviewed