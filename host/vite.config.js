import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        // Points at the remote's built manifest. In a real setup this
        // URL would be an env var pointing at wherever that team
        // deploys their microfrontend.
        remote_products: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@tanstack/react-query'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000,
    cors: true,
  },
  preview: {
    port: 5000,
    cors: true,
  },
})
