module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  plugins: [
    ['component', { // component是 babel-plugin-component的简写
      "libraryName": "mint-ui", // 针对mint-ui库实现按需引入打包
      "style": true // 自动打包对应的css
    }]
  ]
}
