import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Разрешаем подключения с любых IP в сети
    port: 5173,      // Убедимся, что порт тот же
    allowedHosts: [
      'reasonably-feasible-pratincole.cloudpub.ru',
      '.cloudpub.ru', // Разрешить все поддомены cloudpub.ru
      'localhost',
      '.localhost'
    ],
  }
})