/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      includeAssets: [
        "icons/favicon.ico",
        "icons/apple-touch-icon.png",
        "icons/apple-touch-icon.png",
        "robots.txt",
        "logo.svg",
      ],
      manifest: {
        name: "Cat Fact",
        short_name: "Cat Fact",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
});
