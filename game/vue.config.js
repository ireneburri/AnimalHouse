const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://site212224.tw.cs.unibo.it/',
  },
    publicPath: '/'
})

