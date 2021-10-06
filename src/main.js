import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/normalize.css'
import './assets/css/base.css'
import store from './store'

console.log(router)

createApp(App)
    .use(ElementPlus,{size: 'small'})
    .use(router)
    .use(store)
    .mount('#app')

