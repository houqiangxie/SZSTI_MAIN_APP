import {
  defineConfig,
  loadEnv,
  UserConfigExport,
  ConfigEnv,
  searchForWorkspaceRoot,
} from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {createHtmlPlugin} from "vite-plugin-html";
// import legacy from '@vitejs/plugin-legacy'
import Compression from "vite-plugin-compression";
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";
import {createStyleImportPlugin} from "vite-plugin-style-import";
import AutoImport from "unplugin-auto-import/vite";
import WindiCSS from "vite-plugin-windicss";
import ViteImages from "vite-plugin-vue-images";
// import cesium from "vite-plugin-cesium";
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";

const pathResolve = (dir: string): string => resolve(__dirname, ".", dir);

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 环境变量
  const env = loadEnv(mode, process.cwd());
  // 开发环境判断
  const isDev = mode === "dev";
  // vite插件
  const plugins = [
    vue({
      script: {
        refSugar: true, //ref转换
      },
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-app/.test(tag),
        },
      },
    }),
    vueJsx(), //jsx
    // cesium(),
    /**
     *  注入环境变量到html模板中
     *  如在  .env文件中有环境变量  VITE_APP_APP_TITLE=admin
     *  则在 html模板中  可以这样获取  <%- VITE_APP_APP_TITLE %>
     *  文档：  https://github.com/anncwb/vite-plugin-html
     */
    createHtmlPlugin({
      inject: {
        // injectData: { ...env },
        data: {
          env: env,
        },
      },
      minify: true,
    }),
    // elementUi组件自动引入
    Components({
      resolvers: [NaiveUiResolver()],
      dts: "src/components.d.ts",
    }),
    createStyleImportPlugin({
      resolves: [NaiveUiResolver()],
    }),
    // 自动引入
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      // resolvers: [NaiveUiResolve()],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "src/auto-import.d.ts",
    }),
    WindiCSS(),
    /**
     *  把src/icons 下的所有svg 自动加载到body下，供组件使用
     *  类似于webpack中的svg-sprite-loader
     *  文档：https://github.com/anncwb/vite-plugin-svg-icons
     */
    // viteSvgIcons({
    //   // 指定需要缓存的图标文件夹
    //   iconDirs: [resolve(process.cwd(), 'src/icons')],
    //   // 指定symbolId格式
    //   symbolId: 'icon-[name]'
    // })
    ViteImages({
      // dirs: ["src/assets/moduleImages"], // 指明图片存放目录
    }),
    PkgConfig(),
    OptimizationPersist(),
    DefineOptions(),
  ];

  if (!isDev) {
    plugins.push(
      // // 兼容插件
      // legacy({
      //   targets: ['defaults', 'not IE 11'],
      // }),

      // gzip插件，打包压缩代码成gzip  文档： https://github.com/anncwb/vite-plugin-compression
      Compression()
    );
  }
  // } else {
  //   // plugins.push(
  //   //   // mock  文档：https://github.com/anncwb/vite-plugin-mock
  //   //   viteMockServe({
  //   //     mockPath: 'mock',
  //   //     localEnabled: command === 'serve',
  //   //     logger: true
  //   //   })
  //   // )
  // }

  // https://vitejs.dev/config/
  return defineConfig({
    plugins,
    // base: isDev || mode == "buildDev" ? "./" : "/custom-scaffold", // 设置打包路径
    base: "./", // 设置打包路径
    //静态资源服务的文件夹
    publicDir: "public",
    server: {
      // 设置代理，根据我们项目实际情况配置
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      port: 81,
      hmr: { overlay: false },
      host: "0.0.0.0",
      proxy: {
        "^/lhzh": {
          target: "http://localhost:80/",
          changeOrigin: true, // 是否跨域
        },
        "/api": {
          target: "http://172.17.136.54:30022/",
          changeOrigin: true, // 是否跨域
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "^/iserver": {
          target: "https://map.szsti.org:8090/",
          changeOrigin: true, // 是否跨域
          secure: false,
        },
        "^/hotel/api": {
          target: "https://szaqxsbg.szsti.org:8060",
          changeOrigin: true, // 是否跨域
          secure: false,
        },
        //  "/Cesium": {
        //   target: "http://172.17.136.54:8099",
        //   changeOrigin: true, // 是否跨域
        //   secure: false,
        // },
        "^/staticRecourse": {
          target: "http://172.17.136.54:8099",
          changeOrigin: true, // 是否跨域
          secure: false,
        },
        "/nogateway": {
          // 不走网关
          target: "http://172.16.15.190:30004/",
          changeOrigin: true, // 是否跨域
          rewrite: (path) => path.replace(/^\/nogateway/, ""),
        },
        // das webapi
        "^/das/api": {
          target: "http://172.17.136.56:9000",
          changeOrigin: true,
          ws: false,
          rewrite: (path) => path.replace(/^\/das\/api/, "/api"),
        },
        // das websocket
        "^/das/ws": {
          target: "ws://172.17.136.56:15674",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/das\/ws/, ""),
        },
        "^/socket": {
          target: "ws://172.17.136.54:30016",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/socket/, ""),
        },
        "^/onePic": {
          target: "http://172.16.15.151",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/onePic/, "/api"),
        },
        "^/ws": {
          target: "https://apis.map.qq.com",
          changeOrigin: true,
        },
        "^/drones": {
          target: "http://172.17.136.56:807",
          changeOrigin: true,
        },
        "^/yjya": {
          target: "http://172.17.136.54:30015",
          changeOrigin: true,
        },
        "^/sanfang": {
          target: "http://172.17.136.56:18000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sanfang/, ""),
        },
        "^/DataBus": {
          target: "http://172.17.30.15:8083",
          changeOrigin: true, // 是否跨域
          secure: false,
        },
        "^/artemis/api": {
          target: "http://172.17.136.54:30015",
          changeOrigin: true,
          // secure: false,
        },
      },
    },
    resolve: {
      alias: [
        { find: "@", replacement: pathResolve("src") },
        // 解决警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        // {
        //   find: "vue-i18n",
        //   replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        // },
      ],
    },
    build: {
      target: "es2015",
      outDir: env.VITE_APP_outputDir,
      assetsDir: "assets",
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
      // Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后的文件相对更大。
      minify: isDev ? "esbuild" : "terser",
      terserOptions: {
        compress: {
          // 生产环境去除console
          // drop_console: !isDev,
        },
      },
      // rollupOptions: {
      //   input: {
      //     main: resolve(__dirname, "index.html"),
      //     system: resolve(__dirname, "system.html"),
      //   },
      // },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `
          //   // @import '@/assets/scss/variables.scss';
          //   // @import '@/assets/scss/main.scss';
          //  `,
          // additionalData: `
          //   @import '@/assets/styles/_variables.scss';
          //   @import '@/assets/styles/common.scss';
          //  `,
        },
      },
    },
  });
};
