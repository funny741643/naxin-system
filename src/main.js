import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/normalize.css'
import './assets/css/base.css'

console.log(router)

createApp(App)
    .use(ElementPlus,{size: 'small'})
    .use(router)
    .mount('#app')

