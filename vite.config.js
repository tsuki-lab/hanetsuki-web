import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: path.relative(__dirname, 'src'),
  publicDir: path.relative(__dirname, 'src/static'),
  build: {
    outDir: path.relative(__dirname, '../public')
  },
})