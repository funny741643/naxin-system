import axios from 'axios'
import localStorage from '../../utils/cache'
import {
    ElMessage
} from 'element-plus'
const interviewed = {
    namespace:true,
    state: () => {
        return {
           
        }
    },
    mutations: {
        // 修改state中的值
    },
    getters: {},
    actions: {
        appraiseAction({commit},payload){
            const prams = {
                appraise: payload.appraise,
                score: payload.score,
                evaluator: localStorage.getCache("admin_name")
            }
            payload.admin_name = localStorage.getCache("admin_name")
            console.log(payload)
            axios.post(`/appraise/${payload.studentName}`,prams).then(res=>{
                if(res.status === 200){
                    ElMessage.success({
                        message: '提交成功',
                        type: 'success',
                    })
                    window.location.href = "/"
                }
            })
        }
        
    }
}

export default interviewed