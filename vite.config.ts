import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';

// 将 node:process 导入移到与其他 node 导入一起
import process from 'node:process';

import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import markdown from 'vite-plugin-vue-markdown';
import svgLoader from 'vite-svg-loader';

// 统一补齐结尾斜杠，使下方 manifest 里的路径拼接在任何 BASE_URL 取值下都成立
const rawBaseUrl = process.env.BASE_URL ?? '/';
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueI18n({
      runtimeOnly: true,
      jitCompilation: true,
      compositionOnly: true,
      fullInstall: true,
      strictMessage: false,
      include: [resolve(__dirname, 'locales/**')],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'vue-i18n',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Icons({ compiler: 'vue3' }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    markdown(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        // monaco 核心（text-diff 使用）压缩后约 2.4 MB，超过 workbox 默认的
        // 2 MB 上限会被静默排除在预缓存之外，导致 text-diff 离线不可用。
        // 该体积已是精简语言服务后的下限，故上调阈值。
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      manifest: {
        name: 'ITools',
        description: 'Aggregated set of useful tools for developers.',
        display: 'standalone',
        lang: 'en',
        start_url: `${baseUrl}?utm_source=pwa&utm_medium=pwa`,
        orientation: 'any',
        theme_color: '#18a058',
        background_color: '#f1f5f9',
        // 图标路径需带上 baseUrl，否则部署到子路径时会 404
        icons: [
          {
            src: `${baseUrl}favicon-16x16.png`,
            type: 'image/png',
            sizes: '16x16',
          },
          {
            src: `${baseUrl}favicon-32x32.png`,
            type: 'image/png',
            sizes: '32x32',
          },
          {
            src: `${baseUrl}android-chrome-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${baseUrl}android-chrome-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    Components({
      dirs: ['src/'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), IconsResolver({ prefix: 'icon' })],
    }),
    Unocss(),
  ],
  base: baseUrl,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          // monaco 体积远大于其他依赖（约 2.3 MB），独立成块可长期缓存，
          // 不随应用代码变更而失效。用函数形式而非数组，
          // 以覆盖 contrib/ 下的全部子模块。
          if (id.includes('monaco-editor')) {
            return 'monaco';
          }

          // naive-ui 为全站共用的 UI 库，从入口块中拆出以改善首屏缓存表现。
          if (id.includes('naive-ui') || id.includes('vueuc') || id.includes('css-render')) {
            return 'naive-ui';
          }
        },
      },
    },
  },
});
