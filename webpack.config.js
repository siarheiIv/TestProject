var path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "./bundle.js", 
  },
  devtool: "inline-source-map", // https://webpack.js.org/configuration/devtool/
  module: {
    rules: [
      {
        test: /.\js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          } 
        }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3006,
    open: true,
    historyApiFallback: true
  },
  watch: true
}