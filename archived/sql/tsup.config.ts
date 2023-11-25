import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts", "src/react.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  clean: true,
  outDir: "dist",
});
