const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const paths = {
  src: path.resolve(path.join(__dirname, 'src')),
  dist: path.resolve(path.join(__dirname, 'dist')),
}

module.exports = {
  mode: 'development',
  context: paths.src,
  entry: ['./app/index.js', './style/style.scss'],
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'COVID-19 Slovenia',
      filename: 'index.html',
      template: "index.html"
    }),
    new CopyPlugin([{
      from: 'CNAME',
    }]),
  ],
  devServer: {
    contentBase: paths.dist,
  },
  output: {
    path: paths.dist,
    filename: 'bundle.[name].[chunkhash].js'
  }
};