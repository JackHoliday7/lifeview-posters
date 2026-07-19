import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // served from https://toolkit.higherpowersedona.org/ (custom domain at root)
  base: "/",
  plugins: [react()],
  build: {
    // the 5 base64-embedded posters are each their own lazy chunk; they are
    // large by design, so quiet the size warning
    chunkSizeWarningLimit: 1200,
  },
});
