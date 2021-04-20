module.exports = {
  devServer: {
    proxy: {
      "/dev-api": {
        target: "http://39.98.123.211",
        pathRewrite: {
          "^/dev-api": ""
        }
      }
    }
  }
  
}