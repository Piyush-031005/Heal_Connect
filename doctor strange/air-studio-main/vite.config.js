import { defineConfig } from "vite";

// Multi-page app: build every entry HTML, not just index.html.
export default defineConfig({
  base: "./", // relative paths so it works from any subpath (e.g. GitHub Pages /air-studio/)
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        board: "board.html",
        mandala: "mandala.html",
        studio: "studio.html",
      },
    },
  },
});
