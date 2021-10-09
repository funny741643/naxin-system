import axios from 'axios'
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
            const prams = {
                pagesize: 5,
                pagenum: 1
            }
            axios.get('api/superadmin/getadminpage?pagesize=5&pagenum=1',prams).then(res=>{
                console.log(res)
                if(res.status !== 200 && res.status === 1008){
                    console.log('没有权限')
                }else{
                    const {power,adminInfo} = res;
                    commit("changepower",power)
                    commit("changeadminInfo",adminInfo)
                }
            })
        },
        changePowerAction({commit},payload){
            axios.post('/superadmin/changepower')
        }
    }
}

export default accreditModul