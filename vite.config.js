import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      format: 'cjs',
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return '[name].css'
          return assetInfo.name
        }
      }
    }
  },
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['tests/**/*.test.ts', 'src/components/**/*.test.ts', 'src/composables/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue']
    }
  }
})
