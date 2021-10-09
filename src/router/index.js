import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '../utils/cache'
const routes = [
    {
        path: '/',
        // redirect: '/login',
        redirect: '/home',
    },
    {
        path: '/login',
        name: '/login',
        component: () => import('../views/login/login.vue') 
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/user',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/User.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '考生信息'
                }
            },
            {
                path: '/interview1',
                name: 'interview1',
                component: () => import('../views/interview1.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '一面',
                    parent: '面试管理'
                }
            },
            {
                path: '/interview2',
                name: 'interview2',
                component: () => import('../views/interview2.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '二面',
                    parent: '面试管理'
                }
            },
            {
                path: '/interview3',
                name: 'interview3',
                component: () => import('../views/interview3.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '三面',
                    parent: '面试管理'
                }
            },
            {
                path: '/success',
                name: 'success',
                component: () => import('../views/Success.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '新成员名单'
                }
            },{
                path: '/appraise',
                name: 'appraise',
                component: () => import('../views/appraise.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '评价页'
                }
            },
            {
                path: '/SuperAdmin',
                name: 'SuperAdmin',
                component: () => import('../views/superadmin.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '管理员名单'
                }
            }
        ]
    },
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes
})

// router.beforeEach((to)=>{
//     if(to.path !== '/login'){
//         const token = localCache.getCache('token')
//         if(!token){
//             return '/login'
//         }
//     }
// })


export default router;
export { routes };
