module.exports = {
 /*  chainWebpack: config => {
    config.resolve.extensions
      .add('ts')
      .add('tsx');
}, */
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