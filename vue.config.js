const path = require('path')
const px2rem = require('postcss-px2rem')  //  postcss的一个插件

module.exports = { //  只能写vue封装的配置

  // runtimeCompiler: true,   //  是否使用包含运行时编译器的 Vue 构建版本  可以在 Vue 组件中使用 template  默认为false

  lintOnSave: false, //  关闭EsLint的规则

  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          // 配置postcss-px2rem
          px2rem({
            remUnit: 37.5 // 设计稿等分后的rem值   375/10
          })
        ]
      }
    }
  },

  configureWebpack: { //  内部写webpack原生配置
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: {
        'vue$': 'vue/dist/vue.esm.js', // 标识精准匹配  带vue编译器
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    }
  },

  devServer: {
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api': '' // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },

    }
  }
}