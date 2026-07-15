import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // served from https://<user>.github.io/lifeview-posters/
  base: "/lifeview-posters/",
  plugins: [react()],
  build: {
    // the 5 base64-embedded posters are each their own lazy chunk; they are
    // large by design, so quiet the size warning
    chunkSizeWarningLimit: 1200,
  },
});
