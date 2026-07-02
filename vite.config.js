import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = dirname(fileURLToPath(import.meta.url));
const activityDir = resolve(root, "activities");
const input = { index: resolve(root, "index.html") };

for (const file of readdirSync(activityDir).filter((name) => name.endsWith(".html"))) {
  input[file.replace(".html", "")] = resolve(activityDir, file);
}

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "firebase/app": resolve(root, "src/shims/firebase-app.js"),
      "firebase/auth": resolve(root, "src/shims/firebase-auth.js"),
      "firebase/firestore": resolve(root, "src/shims/firebase-firestore.js")
    }
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: { input }
  }
});
