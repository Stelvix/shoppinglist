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
          {
            src: "/frontend-shoppinglist/public/LogoShoppingList.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/frontend-shoppinglist/public/LogoShoppingList.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
   ],
})
