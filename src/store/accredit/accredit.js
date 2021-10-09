import axios from 'axios'
const accreditModul = {
    namespace:true,
    state: () => {
        return {
            flag: ''
        }
    },
    mutations: {
        // 修改state中的值
        changeflag(state,flag){
            state.flag = flag
        }
       
    },
    getters: {},
    actions: {
        accreditAction({commit},payload){
            axios.get('/api/users').then(res=>{
                console.log(res)
                const flag = res.flag
                commit('flag',flag)
            })
        }
    }
}

export default accreditModul