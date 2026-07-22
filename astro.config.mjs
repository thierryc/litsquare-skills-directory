import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://skills.litsquare.com",
  srcDir: "./site/src",
  publicDir: "./site/public",
  outDir: "./dist",
  output: "static",
  integrations: [sitemap()],
  build: {
    format: "directory"
  }
});
