import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({

  // Alias

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // Vue plugin

  plugins: [
    vue()
  ],

  // CSS

  css: {

    // Global CSS variables

    preprocessorOptions: {
      stylus: {
        imports: [path.resolve(__dirname, 'src/styles/variables.styl')],
      }
    },

    // Autoprefixer

    postcss: {
      plugins: [
        require('autoprefixer'),
      ],
    },

  }

})