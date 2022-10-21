import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({

  plugins: [solidPlugin()],

  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    host: "0.0.0.0",
  },
  optimizeDeps: {
    // Add both @codemirror/state and @codemirror/view to included deps for optimization
    include: ["@codemirror/state", "@codemirror/view"],
    extensions: ["jsx"],
    exclude: [
      "@iconify-icon/solid",
    ],
  },
});
