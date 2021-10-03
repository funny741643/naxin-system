import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 这里设置请求的根路径
const BASE_URL = 'http://jsonplaceholder.typicode.com/'

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
  }
})
