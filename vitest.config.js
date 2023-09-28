import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.js",
  },
  compilerOptions: {
    accessors: true,
  },
});
