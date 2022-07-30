import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { macaronVitePlugin } from '@macaron-css/vite';

export default defineConfig({

  plugins: [solidPlugin(), macaronVitePlugin()],

  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    host: "0.0.0.0",
  },
});
