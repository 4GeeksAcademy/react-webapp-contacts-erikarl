import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [
        react({
          include: /\.(jsx|js|ts|tsx)$/, // Esto permite JSX en archivos .js
        }),
      ],
    server: {
        port: 3000
    },
    build: {
        outDir: 'dist'
    }
})