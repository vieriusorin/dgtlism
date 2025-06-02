import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import mdx from '@mdx-js/rollup'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [react(),
  mdx({
    remarkPlugins: [
      [remarkMdxFrontmatter, { name: 'frontmatter' }]
    ]
  })
  ],
  build: {
    outDir: 'build',
  },
  publicDir: 'public',
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, './src/shared'),
      '@domains': resolve(__dirname, './src/domains'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
}) 