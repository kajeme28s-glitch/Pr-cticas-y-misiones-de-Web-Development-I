import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El plugin de React permite a Vite entender JSX
export default defineConfig({
  plugins: [react()],
});
