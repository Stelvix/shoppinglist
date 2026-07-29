import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

 VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "ShoppingList",
        short_name: "ShoppingList",
        description: "Application de gestion de courses",
        theme_color: "#2563eb",
        background_color: "#f8fafc",
        display: "standalone",
        start_url: "/",

        icons: [
          { src: "/pwa-48x48.png", sizes: "48x48", type: "image/png" },
          { src: "/pwa-72x72.png", sizes: "72x72", type: "image/png" },
          { src: "/pwa-96x96.png", sizes: "96x96", type: "image/png" },
          { src: "/pwa-128x128.png", sizes: "128x128", type: "image/png" },
          { src: "/pwa-144x144.png", sizes: "144x144", type: "image/png" },
          { src: "/pwa-152x152.png", sizes: "152x152", type: "image/png" },
          { src: "/pwa-167x167.png", sizes: "167x167", type: "image/png" },
          { src: "/pwa-180x180.png", sizes: "180x180", type: "image/png" },
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-256x256.png", sizes: "256x256", type: "image/png" },
          { src: "/pwa-384x384.png", sizes: "384x384", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
   ],
})
