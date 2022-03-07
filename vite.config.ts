/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
  define: {
    "process.env": {},
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
  },
  css: {},
});
