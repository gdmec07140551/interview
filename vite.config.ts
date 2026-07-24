import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Gitee Pages 子路径部署：npm run build:gitee（base=/interview/）
// 本地 / 根域名部署：npm run build（base=/）
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@content': path.resolve(__dirname, 'content'),
    },
  },
  build: {
    cssMinify: false,
  },
})
