import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "target",
      filename: "remoteEntry.js",
      exposes: {
        "./SalesPage": "./src/pages/sales/sales.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    host: 'localhost',
    port: 4173,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
