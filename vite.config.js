import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  publicDir: path.join(__dirname, 'src/public')
})