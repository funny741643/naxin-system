import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// 这里设置请求的根路径
// http://192.168.1.121:3000
const BASE_URL = 'http://47.96.173.68/api'
// const BASE_URL = ' http://192.168.1.121:3000'

// https://vitejs.dev/config/
// 将请求地址以/api开头的地址映射到baseUrl中，并移除api
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  publicPath:'./'
})