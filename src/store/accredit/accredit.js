import axios from 'axios'
import {
    ElMessage
} from 'element-plus'
const accreditModul = {
    namespace:true,
    state: () => {
        return {
            power: '',
            admimInfo:{},
            adminTotal:'',
            role:''
        }
    },
    mutations: {
        // 修改state中的值
        changepower(state,power){
            state.power = power
        },
        changeadminInfo(state,adminInfo){
            state.adminInfo = adminInfo
        },
        changeadminTotal(state,adminTotal){
            state.adminTotal = adminTotal
        }
    },
    getters: {},
    actions: {
        // 登录后，点击去授权，power为true加载超管的页面，超管授权
        accreditAction({commit},payload){
            // 这里url可以怎样改进？？？
            const params = {
                pagesize: 5,
                pagenum: 1
            }
            axios.get(`api/superadmin/getadminpage?pagesize=${params.pagesize}&pagenum=${params.pagenum}`,prams).then(res=>{
                console.log(res)
                if(res.status !== 200 && res.status === 1008){
                    ElMessage.warning({
                        message: '抱歉，你没有权限！正在授权，请稍等',
                        type: 'warning',
                    })
                    console.log('没有权限')
                }else{
                    const {power,adminInfo} = res;
                    commit("changepower",power)
                    commit("changeadminInfo",adminInfo)
                }
            })
        },
        // 超管改变权限
        changePowerAction({commit},payload){
            let role;
            const groups = ['未选择、未赋权','超级管理员',"前端组", "后台组", "go组", "服务端", "机器学习"]
            groups.filter((item,index)=>{
                if(item == payload.role){
                    role = index
                }
            })
            const prams = {
                admin_num:payload.admin_num,
                role
            }
            // console.log(prams)
            axios.post('/superadmin/changepower',prams)
        }
    }
}

export default accreditModul