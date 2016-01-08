var webpack = require('webpack');
var port = process.env.PORT;

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:'+port,
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: port
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
