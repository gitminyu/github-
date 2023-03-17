const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: process.env.NODE_ENV === "production" ? "/GitDataV/" : "/",
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
})
