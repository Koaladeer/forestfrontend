import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    test:{
      globals:true,
      setupFiles: 'src/components/__tests__/setupTests.ts'
    },
    proxy: {
      '/api': 'http://localhost:8080',
      '^/messages/delete/.*':'http://localhost:8080',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }

  }
})

