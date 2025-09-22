import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 5173,
    open: true,
    strictPort: true,
    hmr: {
      host: "localhost", // or your LAN IP if accessing from another device
      port: 5173,
      protocol: "ws", // WebSocket
    },
  },
});
