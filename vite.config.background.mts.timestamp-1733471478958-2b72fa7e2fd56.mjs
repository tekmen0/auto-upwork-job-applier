// vite.config.background.mts
import { defineConfig as defineConfig2 } from "file:///home/tekmen/Projects/upwork-job-applier/node_modules/vite/dist/node/index.js";

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

// vite.config.background.mts
var vite_config_background_default = defineConfig2({
  ...sharedConfig,
  define: {
    "__DEV__": isDev,
    "__NAME__": JSON.stringify(package_default.name),
    // https://github.com/vitejs/vite/issues/9320
    // https://github.com/vitejs/vite/issues/9186
    "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production")
  },
  build: {
    watch: isDev ? {} : void 0,
    outDir: r("extension/dist/background"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    lib: {
      entry: r("src/background/main.ts"),
      name: package_default.name,
      formats: ["iife"]
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.mjs",
        extend: true
      }
    }
  }
});
export {
  vite_config_background_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuYmFja2dyb3VuZC5tdHMiLCAidml0ZS5jb25maWcubXRzIiwgInNjcmlwdHMvdXRpbHMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllci92aXRlLmNvbmZpZy5iYWNrZ3JvdW5kLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS90ZWttZW4vUHJvamVjdHMvdXB3b3JrLWpvYi1hcHBsaWVyL3ZpdGUuY29uZmlnLmJhY2tncm91bmQubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHNoYXJlZENvbmZpZyB9IGZyb20gJy4vdml0ZS5jb25maWcubWpzJ1xuaW1wb3J0IHsgaXNEZXYsIHIgfSBmcm9tICcuL3NjcmlwdHMvdXRpbHMnXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbi8vIGJ1bmRsaW5nIHRoZSBjb250ZW50IHNjcmlwdCB1c2luZyBWaXRlXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAuLi5zaGFyZWRDb25maWcsXG4gIGRlZmluZToge1xuICAgICdfX0RFVl9fJzogaXNEZXYsXG4gICAgJ19fTkFNRV9fJzogSlNPTi5zdHJpbmdpZnkocGFja2FnZUpzb24ubmFtZSksXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy85MzIwXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy85MTg2XG4gICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkoaXNEZXYgPyAnZGV2ZWxvcG1lbnQnIDogJ3Byb2R1Y3Rpb24nKSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB3YXRjaDogaXNEZXZcbiAgICAgID8ge31cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIG91dERpcjogcignZXh0ZW5zaW9uL2Rpc3QvYmFja2dyb3VuZCcpLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgIHNvdXJjZW1hcDogaXNEZXYgPyAnaW5saW5lJyA6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHIoJ3NyYy9iYWNrZ3JvdW5kL21haW4udHMnKSxcbiAgICAgIG5hbWU6IHBhY2thZ2VKc29uLm5hbWUsXG4gICAgICBmb3JtYXRzOiBbJ2lpZmUnXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2luZGV4Lm1qcycsXG4gICAgICAgIGV4dGVuZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Rla21lbi9Qcm9qZWN0cy91cHdvcmstam9iLWFwcGxpZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Rla21lbi9Qcm9qZWN0cy91cHdvcmstam9iLWFwcGxpZXIvdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Rla21lbi9Qcm9qZWN0cy91cHdvcmstam9iLWFwcGxpZXIvdml0ZS5jb25maWcubXRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyBkaXJuYW1lLCByZWxhdGl2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IHsgaXNEZXYsIHBvcnQsIHIgfSBmcm9tICcuL3NjcmlwdHMvdXRpbHMnXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmV4cG9ydCBjb25zdCBzaGFyZWRDb25maWc6IFVzZXJDb25maWcgPSB7XG4gIHJvb3Q6IHIoJ3NyYycpLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+Lyc6IGAke3IoJ3NyYycpfS9gLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIF9fREVWX186IGlzRGV2LFxuICAgIF9fTkFNRV9fOiBKU09OLnN0cmluZ2lmeShwYWNrYWdlSnNvbi5uYW1lKSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIFZ1ZSgpLFxuXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc6IFtcbiAgICAgICAgICAgIFsnPScsICdicm93c2VyJ10sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkdHM6IHIoJ3NyYy9hdXRvLWltcG9ydHMuZC50cycpLFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkaXJzOiBbcignc3JjL2NvbXBvbmVudHMnKV0sXG4gICAgICAvLyBnZW5lcmF0ZSBgY29tcG9uZW50cy5kLnRzYCBmb3IgdHMgc3VwcG9ydCB3aXRoIFZvbGFyXG4gICAgICBkdHM6IHIoJ3NyYy9jb21wb25lbnRzLmQudHMnKSxcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAvLyBhdXRvIGltcG9ydCBpY29uc1xuICAgICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgICBwcmVmaXg6ICcnLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4taWNvbnNcbiAgICBJY29ucygpLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Vub2Nzcy91bm9jc3NcbiAgICBVbm9DU1MoKSxcblxuICAgIC8vIHJld3JpdGUgYXNzZXRzIHRvIHVzZSByZWxhdGl2ZSBwYXRoXG4gICAge1xuICAgICAgbmFtZTogJ2Fzc2V0cy1yZXdyaXRlJyxcbiAgICAgIGVuZm9yY2U6ICdwb3N0JyxcbiAgICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwsIHsgcGF0aCB9KSB7XG4gICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoL1wiXFwvYXNzZXRzXFwvL2csIGBcIiR7cmVsYXRpdmUoZGlybmFtZShwYXRoKSwgJy9hc3NldHMnKX0vYClcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgJ3Z1ZScsXG4gICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICd3ZWJleHRlbnNpb24tcG9seWZpbGwnLFxuICAgIF0sXG4gICAgZXhjbHVkZTogW1xuICAgICAgJ3Z1ZS1kZW1pJyxcbiAgICBdLFxuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiAoe1xuICAuLi5zaGFyZWRDb25maWcsXG4gIGJhc2U6IGNvbW1hbmQgPT09ICdzZXJ2ZScgPyBgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2AgOiAnL2Rpc3QvJyxcbiAgc2VydmVyOiB7XG4gICAgcG9ydCxcbiAgICBobXI6IHtcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgIH0sXG4gICAgb3JpZ2luOiBgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9YCxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB3YXRjaDogaXNEZXZcbiAgICAgID8ge31cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIG91dERpcjogcignZXh0ZW5zaW9uL2Rpc3QnKSxcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gICAgc291cmNlbWFwOiBpc0RldiA/ICdpbmxpbmUnIDogZmFsc2UsXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL3dlYnN0b3JlL3Byb2dyYW1fcG9saWNpZXMvIzp+OnRleHQ9Q29kZSUyMFJlYWRhYmlsaXR5JTIwUmVxdWlyZW1lbnRzXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgbWFuZ2xlOiBmYWxzZSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG9wdGlvbnM6IHIoJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgcG9wdXA6IHIoJ3NyYy9wb3B1cC9pbmRleC5odG1sJyksXG4gICAgICAgIHNpZGVwYW5lbDogcignc3JjL3NpZGVwYW5lbC9pbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICB9LFxufSkpXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Rla21lbi9Qcm9qZWN0cy91cHdvcmstam9iLWFwcGxpZXIvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdGVrbWVuL1Byb2plY3RzL3Vwd29yay1qb2ItYXBwbGllci9zY3JpcHRzL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Rla21lbi9Qcm9qZWN0cy91cHdvcmstam9iLWFwcGxpZXIvc2NyaXB0cy91dGlscy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBiZ0N5YW4sIGJsYWNrIH0gZnJvbSAna29sb3Jpc3QnXG5cbmV4cG9ydCBjb25zdCBwb3J0ID0gTnVtYmVyKHByb2Nlc3MuZW52LlBPUlQgfHwgJycpIHx8IDMzMDNcbmV4cG9ydCBjb25zdCByID0gKC4uLmFyZ3M6IHN0cmluZ1tdKSA9PiByZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgLi4uYXJncylcbmV4cG9ydCBjb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmV4cG9ydCBjb25zdCBpc0ZpcmVmb3ggPSBwcm9jZXNzLmVudi5FWFRFTlNJT04gPT09ICdmaXJlZm94J1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gIGNvbnNvbGUubG9nKGJsYWNrKGJnQ3lhbihgICR7bmFtZX0gYCkpLCBtZXNzYWdlKVxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidml0ZXNzZS13ZWJleHRcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIlZpdGVzc2UgV2ViRXh0XCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUA5LjcuMVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiW2Rlc2NyaXB0aW9uXVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwibnBtIHJ1biBjbGVhciAmJiBjcm9zcy1lbnYgTk9ERV9FTlY9ZGV2ZWxvcG1lbnQgcnVuLXAgZGV2OipcIixcbiAgICBcImRldi1maXJlZm94XCI6IFwibnBtIHJ1biBjbGVhciAmJiBjcm9zcy1lbnYgTk9ERV9FTlY9ZGV2ZWxvcG1lbnQgRVhURU5TSU9OPWZpcmVmb3ggcnVuLXAgZGV2OipcIixcbiAgICBcImRldjpwcmVwYXJlXCI6IFwiZXNubyBzY3JpcHRzL3ByZXBhcmUudHNcIixcbiAgICBcImRldjpiYWNrZ3JvdW5kXCI6IFwibnBtIHJ1biBidWlsZDpiYWNrZ3JvdW5kIC0tIC0tbW9kZSBkZXZlbG9wbWVudFwiLFxuICAgIFwiZGV2OndlYlwiOiBcInZpdGVcIixcbiAgICBcImRldjpqc1wiOiBcIm5wbSBydW4gYnVpbGQ6anMgLS0gLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgXCJidWlsZFwiOiBcImNyb3NzLWVudiBOT0RFX0VOVj1wcm9kdWN0aW9uIHJ1bi1zIGNsZWFyIGJ1aWxkOndlYiBidWlsZDpwcmVwYXJlIGJ1aWxkOmJhY2tncm91bmQgYnVpbGQ6anNcIixcbiAgICBcImJ1aWxkOnByZXBhcmVcIjogXCJlc25vIHNjcmlwdHMvcHJlcGFyZS50c1wiLFxuICAgIFwiYnVpbGQ6YmFja2dyb3VuZFwiOiBcInZpdGUgYnVpbGQgLS1jb25maWcgdml0ZS5jb25maWcuYmFja2dyb3VuZC5tdHNcIixcbiAgICBcImJ1aWxkOndlYlwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkOmpzXCI6IFwidml0ZSBidWlsZCAtLWNvbmZpZyB2aXRlLmNvbmZpZy5jb250ZW50Lm10c1wiLFxuICAgIFwicGFja1wiOiBcImNyb3NzLWVudiBOT0RFX0VOVj1wcm9kdWN0aW9uIHJ1bi1wIHBhY2s6KlwiLFxuICAgIFwicGFjazp6aXBcIjogXCJyaW1yYWYgZXh0ZW5zaW9uLnppcCAmJiBqc3ppcC1jbGkgYWRkIGV4dGVuc2lvbi8qIC1vIC4vZXh0ZW5zaW9uLnppcFwiLFxuICAgIFwicGFjazpjcnhcIjogXCJjcnggcGFjayBleHRlbnNpb24gLW8gLi9leHRlbnNpb24uY3J4XCIsXG4gICAgXCJwYWNrOnhwaVwiOiBcImNyb3NzLWVudiBXRUJfRVhUX0FSVElGQUNUU19ESVI9Li8gd2ViLWV4dCBidWlsZCAtLXNvdXJjZS1kaXIgLi9leHRlbnNpb24gLS1maWxlbmFtZSBleHRlbnNpb24ueHBpIC0tb3ZlcndyaXRlLWRlc3RcIixcbiAgICBcInN0YXJ0OmNocm9taXVtXCI6IFwid2ViLWV4dCBydW4gLS1zb3VyY2UtZGlyIC4vZXh0ZW5zaW9uIC0tdGFyZ2V0PWNocm9taXVtXCIsXG4gICAgXCJzdGFydDpmaXJlZm94XCI6IFwid2ViLWV4dCBydW4gLS1zb3VyY2UtZGlyIC4vZXh0ZW5zaW9uIC0tdGFyZ2V0PWZpcmVmb3gtZGVza3RvcFwiLFxuICAgIFwiY2xlYXJcIjogXCJyaW1yYWYgLS1nbG9iIGV4dGVuc2lvbi9kaXN0IGV4dGVuc2lvbi9tYW5pZmVzdC5qc29uIGV4dGVuc2lvbi4qXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC0tY2FjaGUgLlwiLFxuICAgIFwidGVzdFwiOiBcInZpdGVzdCB0ZXN0XCIsXG4gICAgXCJ0ZXN0OmUyZVwiOiBcInBsYXl3cmlnaHQgdGVzdFwiLFxuICAgIFwicG9zdGluc3RhbGxcIjogXCJzaW1wbGUtZ2l0LWhvb2tzXCIsXG4gICAgXCJ0eXBlY2hlY2tcIjogXCJ0c2MgLS1ub0VtaXRcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIl4yLjI3LjBcIixcbiAgICBcIkBmZmZsb3JpYW4vanN6aXAtY2xpXCI6IFwiXjMuNy4xXCIsXG4gICAgXCJAaWNvbmlmeS9qc29uXCI6IFwiXjIuMi4yMzlcIixcbiAgICBcIkBwbGF5d3JpZ2h0L3Rlc3RcIjogXCJeMS40Ni4xXCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yODdcIixcbiAgICBcIkB0eXBlcy9mcy1leHRyYVwiOiBcIl4xMS4wLjRcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjUuMFwiLFxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEyLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjguMi4wXCIsXG4gICAgXCJAdW5vY3NzL3Jlc2V0XCI6IFwiXjAuNjIuMlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMS4yXCIsXG4gICAgXCJAdnVlL2NvbXBpbGVyLXNmY1wiOiBcIl4zLjQuMzhcIixcbiAgICBcIkB2dWUvdGVzdC11dGlsc1wiOiBcIl4yLjQuNlwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjExLjAuMVwiLFxuICAgIFwiY2hva2lkYXJcIjogXCJeMy42LjBcIixcbiAgICBcImNyb3NzLWVudlwiOiBcIl43LjAuM1wiLFxuICAgIFwiY3J4XCI6IFwiXjUuMC4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOS45LjBcIixcbiAgICBcImVzbm9cIjogXCJeNC43LjBcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxuICAgIFwianNkb21cIjogXCJeMjQuMS4xXCIsXG4gICAgXCJrb2xvcmlzdFwiOiBcIl4xLjguMFwiLFxuICAgIFwibGludC1zdGFnZWRcIjogXCJeMTUuMi45XCIsXG4gICAgXCJucG0tcnVuLWFsbFwiOiBcIl40LjEuNVwiLFxuICAgIFwicmltcmFmXCI6IFwiXjYuMC4xXCIsXG4gICAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IFwiXjIuMTEuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjUuNFwiLFxuICAgIFwidW5vY3NzXCI6IFwiXjAuNjIuMlwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xOC4yXCIsXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4wLjE5LjJcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuNFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjQuMlwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjIuMC41XCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjM4XCIsXG4gICAgXCJ2dWUtZGVtaVwiOiBcIl4wLjE0LjEwXCIsXG4gICAgXCJ3ZWItZXh0XCI6IFwiXjguMi4wXCIsXG4gICAgXCJ3ZWJleHQtYnJpZGdlXCI6IFwiXjYuMC4xXCIsXG4gICAgXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMi4wXCJcbiAgfSxcbiAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IHtcbiAgICBcInByZS1jb21taXRcIjogXCJwbnBtIGxpbnQtc3RhZ2VkXCJcbiAgfSxcbiAgXCJsaW50LXN0YWdlZFwiOiB7XG4gICAgXCIqXCI6IFwiZXNsaW50IC0tZml4XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGxhbmdjaGFpbi9jb3JlXCI6IFwiXjAuMy4xOVwiLFxuICAgIFwiQGxhbmdjaGFpbi9ncm9xXCI6IFwiXjAuMS4yXCIsXG4gICAgXCJsYW5nY2hhaW5cIjogXCJeMC4zLjZcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsZ0JBQUFBLHFCQUFvQjs7O0FDRS9WLFNBQVMsU0FBUyxnQkFBZ0I7QUFFbEMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFP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
