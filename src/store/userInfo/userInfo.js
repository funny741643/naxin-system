// import {Module} from 'vuex'
import axios from 'axios'
const userInfoModule = {
    namespace: true,
    state: () => {
        return {
            userInfo: [],
            usertotal: ''
        }
    },
    mutations: {
        // 修改state中的值
        changeUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        changeUsertotal(state, usertotal) {
            state.usertotal = usertotal
        }

    },
    getters: {},
    actions: {
        UserInfoAcction({
            commit
        }, payload) {
            console.log('开始请求信息')
            //   请求用户信息
            axios.get(`/uninterview?pagesize=${payload.pagesize} & pagenum=${payload.pagenum}`).then((res) => {
                if (res.status === 200) {
                    //   const {userInfo,usertotal} = res
                    const userInfo = res.list
                    const usertotal = res.total
                    commit("changeUserInfo", userInfo)
                    commit("changeUsertotal", usertotal)
                }

            })
        }

    }
}

export default userInfoModule