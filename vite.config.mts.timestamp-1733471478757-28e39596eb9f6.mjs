// vite.config.mts
import { dirname, relative } from "node:path";
import { defineConfig } from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/vite/dist/node/index.js";
import Vue from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/unplugin-icons/dist/resolver.js";
import Components from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/unplugin-auto-import/dist/vite.js";
import UnoCSS from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/unocss/dist/vite.mjs";

// scripts/utils.ts
import { resolve } from "node:path";
import process from "node:process";
import { bgCyan, black } from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/kolorist/dist/esm/index.mjs";
var __vite_injected_original_dirname = "/home/tekmen/Projects/upwork-job-applier/scripts";
var port = Number(process.env.PORT || "") || 3303;
var r = (...args) => resolve(__vite_injected_original_dirname, "..", ...args);
var isDev = process.env.NODE_ENV !== "production";
var isFirefox = process.env.EXTENSION === "firefox";

// package.json
var package_default = {
  name: "vitesse-webext",
  displayName: "Vitesse WebExt",
  version: "0.0.1",
  private: true,
  packageManager: "pnpm@9.7.1",
  description: "[description]",
  scripts: {
    dev: "npm run clear && cross-env NODE_ENV=development run-p dev:*",
    "dev-firefox": "npm run clear && cross-env NODE_ENV=development EXTENSION=firefox run-p dev:*",
    "dev:prepare": "esno scripts/prepare.ts",
    "dev:background": "npm run build:background -- --mode development",
    "dev:web": "vite",
    "dev:js": "npm run build:js -- --mode development",
    build: "cross-env NODE_ENV=production run-s clear build:web build:prepare build:background build:js",
    "build:prepare": "esno scripts/prepare.ts",
    "build:background": "vite build --config vite.config.background.mts",
    "build:web": "vite build",
    "build:js": "vite build --config vite.config.content.mts",
    pack: "cross-env NODE_ENV=production run-p pack:*",
    "pack:zip": "rimraf extension.zip && jszip-cli add extension/* -o ./extension.zip",
    "pack:crx": "crx pack extension -o ./extension.crx",
    "pack:xpi": "cross-env WEB_EXT_ARTIFACTS_DIR=./ web-ext build --source-dir ./extension --filename extension.xpi --overwrite-dest",
    "start:chromium": "web-ext run --source-dir ./extension --target=chromium",
    "start:firefox": "web-ext run --source-dir ./extension --target=firefox-desktop",
    clear: "rimraf --glob extension/dist extension/manifest.json extension.*",
    lint: "eslint --cache .",
    test: "vitest test",
    "test:e2e": "playwright test",
    postinstall: "simple-git-hooks",
    typecheck: "tsc --noEmit"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.27.0",
    "@ffflorian/jszip-cli": "^3.7.1",
    "@iconify/json": "^2.2.239",
    "@playwright/test": "^1.46.1",
    "@types/chrome": "^0.0.287",
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^22.5.0",
    "@types/webextension-polyfill": "^0.12.0",
    "@typescript-eslint/eslint-plugin": "^8.2.0",
    "@unocss/reset": "^0.62.2",
    "@vitejs/plugin-vue": "^5.1.2",
    "@vue/compiler-sfc": "^3.4.38",
    "@vue/test-utils": "^2.4.6",
    "@vueuse/core": "^11.0.1",
    chokidar: "^3.6.0",
    "cross-env": "^7.0.3",
    crx: "^5.0.1",
    eslint: "^9.9.0",
    esno: "^4.7.0",
    "fs-extra": "^11.2.0",
    jsdom: "^24.1.1",
    kolorist: "^1.8.0",
    "lint-staged": "^15.2.9",
    "npm-run-all": "^4.1.5",
    rimraf: "^6.0.1",
    "simple-git-hooks": "^2.11.1",
    typescript: "^5.5.4",
    unocss: "^0.62.2",
    "unplugin-auto-import": "^0.18.2",
    "unplugin-icons": "^0.19.2",
    "unplugin-vue-components": "^0.27.4",
    vite: "^5.4.2",
    vitest: "^2.0.5",
    vue: "^3.4.38",
    "vue-demi": "^0.14.10",
    "web-ext": "^8.2.0",
    "webext-bridge": "^6.0.1",
    "webextension-polyfill": "^0.12.0"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  },
  dependencies: {
    "@langchain/core": "^0.3.19",
    "@langchain/groq": "^0.1.2",
    langchain: "^0.3.6"
  }
};

// vite.config.mts
var sharedConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "~/": `${r("src")}/`
    }
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(package_default.name)
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "webextension-polyfill": [
            ["=", "browser"]
          ]
        }
      ],
      dts: r("src/auto-imports.d.ts")
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [r("src/components")],
      // generate `components.d.ts` for ts support with Volar
      dts: r("src/components.d.ts"),
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: ""
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons(),
    // https://github.com/unocss/unocss
    UnoCSS(),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), "/assets")}/`);
      }
    }
  ],
  optimizeDeps: {
    include: [
      "vue",
      "@vueuse/core",
      "webextension-polyfill"
    ],
    exclude: [
      "vue-demi"
    ]
  }
};
var vite_config_default = defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost"
    },
    origin: `http://localhost:${port}`
  },
  build: {
    watch: isDev ? {} : void 0,
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false
    },
    rollupOptions: {
      input: {
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html"),
        sidepanel: r("src/sidepanel/index.html")
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
}));
export {
  vite_config_default as default,
  sharedConfig
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInNjcmlwdHMvdXRpbHMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllci92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllci92aXRlLmNvbmZpZy5tdHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRpcm5hbWUsIHJlbGF0aXZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyBpc0RldiwgcG9ydCwgciB9IGZyb20gJy4vc2NyaXB0cy91dGlscydcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuZXhwb3J0IGNvbnN0IHNoYXJlZENvbmZpZzogVXNlckNvbmZpZyA9IHtcbiAgcm9vdDogcignc3JjJyksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7cignc3JjJyl9L2AsXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgX19ERVZfXzogaXNEZXYsXG4gICAgX19OQU1FX186IEpTT04uc3RyaW5naWZ5KHBhY2thZ2VKc29uLm5hbWUpLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgVnVlKCksXG5cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgIHtcbiAgICAgICAgICAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJzogW1xuICAgICAgICAgICAgWyc9JywgJ2Jyb3dzZXInXSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGR0czogcignc3JjL2F1dG8taW1wb3J0cy5kLnRzJyksXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGRpcnM6IFtyKCdzcmMvY29tcG9uZW50cycpXSxcbiAgICAgIC8vIGdlbmVyYXRlIGBjb21wb25lbnRzLmQudHNgIGZvciB0cyBzdXBwb3J0IHdpdGggVm9sYXJcbiAgICAgIGR0czogcignc3JjL2NvbXBvbmVudHMuZC50cycpLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIC8vIGF1dG8gaW1wb3J0IGljb25zXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogJycsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1pY29uc1xuICAgIEljb25zKCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdW5vY3NzL3Vub2Nzc1xuICAgIFVub0NTUygpLFxuXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcbiAgICB7XG4gICAgICBuYW1lOiAnYXNzZXRzLXJld3JpdGUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgeyBwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvXCJcXC9hc3NldHNcXC8vZywgYFwiJHtyZWxhdGl2ZShkaXJuYW1lKHBhdGgpLCAnL2Fzc2V0cycpfS9gKVxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAndnVlJyxcbiAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCcsXG4gICAgXSxcbiAgICBleGNsdWRlOiBbXG4gICAgICAndnVlLWRlbWknLFxuICAgIF0sXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+ICh7XG4gIC4uLnNoYXJlZENvbmZpZyxcbiAgYmFzZTogY29tbWFuZCA9PT0gJ3NlcnZlJyA/IGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vYCA6ICcvZGlzdC8nLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0LFxuICAgIGhtcjoge1xuICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgfSxcbiAgICBvcmlnaW46IGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gLFxuICB9LFxuICBidWlsZDoge1xuICAgIHdhdGNoOiBpc0RldlxuICAgICAgPyB7fVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgb3V0RGlyOiByKCdleHRlbnNpb24vZGlzdCcpLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICBzb3VyY2VtYXA6IGlzRGV2ID8gJ2lubGluZScgOiBmYWxzZSxcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3Mvd2Vic3RvcmUvcHJvZ3JhbV9wb2xpY2llcy8jOn46dGV4dD1Db2RlJTIwUmVhZGFiaWxpdHklMjBSZXF1aXJlbWVudHNcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBtYW5nbGU6IGZhbHNlLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgb3B0aW9uczogcignc3JjL29wdGlvbnMvaW5kZXguaHRtbCcpLFxuICAgICAgICBwb3B1cDogcignc3JjL3BvcHVwL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgc2lkZXBhbmVsOiByKCdzcmMvc2lkZXBhbmVsL2luZGV4Lmh0bWwnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gIH0sXG59KSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllci9zY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS90ZWttZW4vUHJvamVjdHMvdXB3b3JrLWpvYi1hcHBsaWVyL3NjcmlwdHMvdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllci9zY3JpcHRzL3V0aWxzLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcbmltcG9ydCB7IGJnQ3lhbiwgYmxhY2sgfSBmcm9tICdrb2xvcmlzdCdcblxuZXhwb3J0IGNvbnN0IHBvcnQgPSBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVCB8fCAnJykgfHwgMzMwM1xuZXhwb3J0IGNvbnN0IHIgPSAoLi4uYXJnczogc3RyaW5nW10pID0+IHJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAuLi5hcmdzKVxuZXhwb3J0IGNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuZXhwb3J0IGNvbnN0IGlzRmlyZWZveCA9IHByb2Nlc3MuZW52LkVYVEVOU0lPTiA9PT0gJ2ZpcmVmb3gnXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgY29uc29sZS5sb2coYmxhY2soYmdDeWFuKGAgJHtuYW1lfSBgKSksIG1lc3NhZ2UpXG59XG4iLCAie1xuICBcIm5hbWVcIjogXCJ2aXRlc3NlLXdlYmV4dFwiLFxuICBcImRpc3BsYXlOYW1lXCI6IFwiVml0ZXNzZSBXZWJFeHRcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDkuNy4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJbZGVzY3JpcHRpb25dXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJucG0gcnVuIGNsZWFyICYmIGNyb3NzLWVudiBOT0RFX0VOVj1kZXZlbG9wbWVudCBydW4tcCBkZXY6KlwiLFxuICAgIFwiZGV2LWZpcmVmb3hcIjogXCJucG0gcnVuIGNsZWFyICYmIGNyb3NzLWVudiBOT0RFX0VOVj1kZXZlbG9wbWVudCBFWFRFTlNJT049ZmlyZWZveCBydW4tcCBkZXY6KlwiLFxuICAgIFwiZGV2OnByZXBhcmVcIjogXCJlc25vIHNjcmlwdHMvcHJlcGFyZS50c1wiLFxuICAgIFwiZGV2OmJhY2tncm91bmRcIjogXCJucG0gcnVuIGJ1aWxkOmJhY2tncm91bmQgLS0gLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgXCJkZXY6d2ViXCI6IFwidml0ZVwiLFxuICAgIFwiZGV2OmpzXCI6IFwibnBtIHJ1biBidWlsZDpqcyAtLSAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcbiAgICBcImJ1aWxkXCI6IFwiY3Jvc3MtZW52IE5PREVfRU5WPXByb2R1Y3Rpb24gcnVuLXMgY2xlYXIgYnVpbGQ6d2ViIGJ1aWxkOnByZXBhcmUgYnVpbGQ6YmFja2dyb3VuZCBidWlsZDpqc1wiLFxuICAgIFwiYnVpbGQ6cHJlcGFyZVwiOiBcImVzbm8gc2NyaXB0cy9wcmVwYXJlLnRzXCIsXG4gICAgXCJidWlsZDpiYWNrZ3JvdW5kXCI6IFwidml0ZSBidWlsZCAtLWNvbmZpZyB2aXRlLmNvbmZpZy5iYWNrZ3JvdW5kLm10c1wiLFxuICAgIFwiYnVpbGQ6d2ViXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiYnVpbGQ6anNcIjogXCJ2aXRlIGJ1aWxkIC0tY29uZmlnIHZpdGUuY29uZmlnLmNvbnRlbnQubXRzXCIsXG4gICAgXCJwYWNrXCI6IFwiY3Jvc3MtZW52IE5PREVfRU5WPXByb2R1Y3Rpb24gcnVuLXAgcGFjazoqXCIsXG4gICAgXCJwYWNrOnppcFwiOiBcInJpbXJhZiBleHRlbnNpb24uemlwICYmIGpzemlwLWNsaSBhZGQgZXh0ZW5zaW9uLyogLW8gLi9leHRlbnNpb24uemlwXCIsXG4gICAgXCJwYWNrOmNyeFwiOiBcImNyeCBwYWNrIGV4dGVuc2lvbiAtbyAuL2V4dGVuc2lvbi5jcnhcIixcbiAgICBcInBhY2s6eHBpXCI6IFwiY3Jvc3MtZW52IFdFQl9FWFRfQVJUSUZBQ1RTX0RJUj0uLyB3ZWItZXh0IGJ1aWxkIC0tc291cmNlLWRpciAuL2V4dGVuc2lvbiAtLWZpbGVuYW1lIGV4dGVuc2lvbi54cGkgLS1vdmVyd3JpdGUtZGVzdFwiLFxuICAgIFwic3RhcnQ6Y2hyb21pdW1cIjogXCJ3ZWItZXh0IHJ1biAtLXNvdXJjZS1kaXIgLi9leHRlbnNpb24gLS10YXJnZXQ9Y2hyb21pdW1cIixcbiAgICBcInN0YXJ0OmZpcmVmb3hcIjogXCJ3ZWItZXh0IHJ1biAtLXNvdXJjZS1kaXIgLi9leHRlbnNpb24gLS10YXJnZXQ9ZmlyZWZveC1kZXNrdG9wXCIsXG4gICAgXCJjbGVhclwiOiBcInJpbXJhZiAtLWdsb2IgZXh0ZW5zaW9uL2Rpc3QgZXh0ZW5zaW9uL21hbmlmZXN0Lmpzb24gZXh0ZW5zaW9uLipcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLS1jYWNoZSAuXCIsXG4gICAgXCJ0ZXN0XCI6IFwidml0ZXN0IHRlc3RcIixcbiAgICBcInRlc3Q6ZTJlXCI6IFwicGxheXdyaWdodCB0ZXN0XCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcInNpbXBsZS1naXQtaG9va3NcIixcbiAgICBcInR5cGVjaGVja1wiOiBcInRzYyAtLW5vRW1pdFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiXjIuMjcuMFwiLFxuICAgIFwiQGZmZmxvcmlhbi9qc3ppcC1jbGlcIjogXCJeMy43LjFcIixcbiAgICBcIkBpY29uaWZ5L2pzb25cIjogXCJeMi4yLjIzOVwiLFxuICAgIFwiQHBsYXl3cmlnaHQvdGVzdFwiOiBcIl4xLjQ2LjFcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI4N1wiLFxuICAgIFwiQHR5cGVzL2ZzLWV4dHJhXCI6IFwiXjExLjAuNFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuNS4wXCIsXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTIuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeOC4yLjBcIixcbiAgICBcIkB1bm9jc3MvcmVzZXRcIjogXCJeMC42Mi4yXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4xLjJcIixcbiAgICBcIkB2dWUvY29tcGlsZXItc2ZjXCI6IFwiXjMuNC4zOFwiLFxuICAgIFwiQHZ1ZS90ZXN0LXV0aWxzXCI6IFwiXjIuNC42XCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTEuMC4xXCIsXG4gICAgXCJjaG9raWRhclwiOiBcIl4zLjYuMFwiLFxuICAgIFwiY3Jvc3MtZW52XCI6IFwiXjcuMC4zXCIsXG4gICAgXCJjcnhcIjogXCJeNS4wLjFcIixcbiAgICBcImVzbGludFwiOiBcIl45LjkuMFwiLFxuICAgIFwiZXNub1wiOiBcIl40LjcuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yNC4xLjFcIixcbiAgICBcImtvbG9yaXN0XCI6IFwiXjEuOC4wXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjlcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXG4gICAgXCJyaW1yYWZcIjogXCJeNi4wLjFcIixcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi4xMS4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNS40XCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC42Mi4yXCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE4LjJcIixcbiAgICBcInVucGx1Z2luLWljb25zXCI6IFwiXjAuMTkuMlwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNy40XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4yXCIsXG4gICAgXCJ2aXRlc3RcIjogXCJeMi4wLjVcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMzhcIixcbiAgICBcInZ1ZS1kZW1pXCI6IFwiXjAuMTQuMTBcIixcbiAgICBcIndlYi1leHRcIjogXCJeOC4yLjBcIixcbiAgICBcIndlYmV4dC1icmlkZ2VcIjogXCJeNi4wLjFcIixcbiAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEyLjBcIlxuICB9LFxuICBcInNpbXBsZS1naXQtaG9va3NcIjoge1xuICAgIFwicHJlLWNvbW1pdFwiOiBcInBucG0gbGludC1zdGFnZWRcIlxuICB9LFxuICBcImxpbnQtc3RhZ2VkXCI6IHtcbiAgICBcIipcIjogXCJlc2xpbnQgLS1maXhcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbGFuZ2NoYWluL2NvcmVcIjogXCJeMC4zLjE5XCIsXG4gICAgXCJAbGFuZ2NoYWluL2dyb3FcIjogXCJeMC4xLjJcIixcbiAgICBcImxhbmdjaGFpblwiOiBcIl4wLjMuNlwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLFNBQVMsZ0JBQWdCO0FBRWxDLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZOzs7QUNWbVMsU0FBUyxlQUFlO0FBQzlVLE9BQU8sYUFBYTtBQUNwQixTQUFTLFFBQVEsYUFBYTtBQUY5QixJQUFNLG1DQUFtQztBQUlsQyxJQUFNLE9BQU8sT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLEtBQUs7QUFDL0MsSUFBTSxJQUFJLElBQUksU0FBbUIsUUFBUSxrQ0FBVyxNQUFNLEdBQUcsSUFBSTtBQUNqRSxJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFDdkMsSUFBTSxZQUFZLFFBQVEsSUFBSSxjQUFjOzs7QUNQbkQ7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLGdCQUFrQjtBQUFBLEVBQ2xCLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQVM7QUFBQSxJQUNULGlCQUFpQjtBQUFB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
