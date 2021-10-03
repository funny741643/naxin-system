
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
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
                    title: '一轮面试',
                    parent: '面试管理'
                }
            },
            {
                path: '/interview2',
                name: 'interview2',
                component: () => import('../views/interview2.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '二轮面试',
                    parent: '面试管理'
                }
            },
            {
                path: '/interview3',
                name: 'interview3',
                component: () => import('../views/interview3.vue'),
                meta: {
                    icon: 'el-icon-location',
                    title: '三轮面试',
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
            }
        ]
    },
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes
})


export default router;
export { routes };
