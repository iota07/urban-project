import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.stl", "**/*.vtk", "**/*.vtp"],
  resolve: {
    alias: {
      // Ensure leaflet's images are loaded correctly
      "leaflet/dist/images": path.resolve(
        __dirname,
        "node_modules/leaflet/dist/images"
      ),
    },
  },
  // Vite asset handling configuration
  optimizeDeps: {
    include: ["leaflet", "chart.js/auto", "react-chartjs-2"],
  },
  build: {
    rollupOptions: {
      output: {
        // Generate hashed filenames for production builds
        chunkFileNames: `assets/chunks/[name].[hash].js`,
        entryFileNames: `assets/js/[name].[hash].js`,
        assetFileNames: `assets/[ext]/[name].[hash].[ext]`,
      },
    },
  },
});
