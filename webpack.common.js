const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    widget: [
      path.join(__dirname, 'src', 'widget', 'injectChat.js')
    ],
    chat: [
      path.join(__dirname, 'src', 'chat', 'index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['widget'],
      template: './public/demo.html',
      filename: './demo.html'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['chat'],
      template: './public/chat.html',
      filename: './chat.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id}.css'
    })
  ]
}