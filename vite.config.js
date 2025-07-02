/*
 * vite配置
 *
 * @Author:    1024创新实验室-主任：卓大
 * @Date:      2022-05-02 23:44:56
 * @Wechat:    zhuda1024
 * @Email:     lab1024@163.com
 * @Copyright  1024创新实验室 （ https://1024lab.net ），Since 2012
 */
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import customVariables from '/@/theme/custom-variables.js';
import AutoImport from 'unplugin-auto-import/vite';

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir);
};
// http://36.137.53.24:8081
const baseUrl = process.env.NODE_ENV === 'dev' ? 'http://116.196.87.183:8085' : 'http://116.196.87.183:8085'
// const baseUrl = process.env.NODE_ENV === 'dev' ? 'http://192.168.0.91:8085' : 'http://192.168.0.91:8085'

export default {
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  root: process.cwd(),
  server: {
    host: '127.0.0.1',
    port: 8081,
    cors: true,
    open: true,
    hmr: true,
    proxy: {
      '/sa-api': {
        changeOrigin: true,
        target: baseUrl,
        pathRewrite: {
          '^/sa-api': ''
        }
      },
      '/firecontrol/api': {
        // 模拟数据
        target: `${baseUrl}/firecontrol/api/`,
        // target: "http://192.168.1.68:8084/",
        changeOrigin: true,
        pathRewrite: {
          '^/firecontrol/api': ''
        }
      },
      '/public': {
        changeOrigin: true,
        target: `${baseUrl}/saadmin-api/upload`,
        pathRewrite: {
          '^/public': ''
        }
      },
      '/fire-public': {
        changeOrigin: true,
        target: `http://36.137.53.24:16060/upload/public`,
        pathRewrite: {
          '^/fire-public': ''
        }
      },
      // '/public': {
      //   // 文件上传访问
      //   target: "http://36.137.53.24:16060/upload/public",
      //   // target: "http://192.168.1.68:16060/upload/public",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/public': ''
      //   }
      // },
      '/erp-url': {
        changeOrigin: true,
        target: `https://erp.aiysyd.cn`,
        pathRewrite: {
          '^/erp-url': ''
        }
      },
      '/magic': {
        changeOrigin: true,
        target: `http://36.137.53.24:13060`,
        // target: `http://192.168.1.68:13060`,
        pathRewrite: {
          '^/magic': ''
        }
      },
      '/helmet-api': {
          target: "http://36.137.53.24:17060",
          // target: "http://192.168.1.68:17060",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/helmet-api/, "")
        },
      '/wsa': {
          // 设备中心
          // target: "ws://36.137.53.24:15674/",
          target: "ws://116.196.87.183:8085/",
          changeOrigin: true,
          ws: true,
          // rewrite: path => path.replace(/^\ws/, "")
        },
      '/oryxUrl': {
          target: "http://36.137.53.24:2022/",
          // target: "http://192.168.1.68:2022/",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/oryxUrl/, "")
        }
    }
  },
  resolve: {
    alias: [
      // 国际化替换
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      // 绝对路径重命名：/@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  plugins: [vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    })],
  optimizeDeps: {
    include: ['ant-design-vue/es/locale/zh_CN', 'dayjs/locale/zh-cn', 'ant-design-vue/es/locale/en_US'],
    exclude: ['vue-demi'],
  },
  build: {
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        //配置这个是让不同类型文件放在不同文件夹，不会显得太乱
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态文件目录
    assetsInlineLimit: '4096', // 小于此阈值的导入或引用资源将内联为 base64 编码
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    emptyOutDir: true, //打包前先清空原有打包文件
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: customVariables,
        javascriptEnabled: true,
      },
    },
  },
  define: {
    __INTLIFY_PROD_DEVTOOLS__: false,
    'process.env': process.env,
  },
};
