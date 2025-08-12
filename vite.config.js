import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/DashBoard-React/"
// });

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === "serve" ? "/" : "/DashBoard-React/",
  };
});
