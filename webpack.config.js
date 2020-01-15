const path = require('path');
const webpack = require('webpack');

// copy manifest.json to the path: 'public/build'
// this will allow for the authRequest to see the file at www.example.com/manifest.json

//,{ from: 'src/styles/style.css', to: 'css/style.css' }
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestAssetPlugin = new CopyWebpackPlugin([ { from: 'src/assets/manifest.json', to: 'manifest.json' } ]);
const IconAssetPlugin = new CopyWebpackPlugin([ { from: 'src/images/icon-192x192.png', to: 'icon-192x192.png' } ]);
const NetlifyPlugin = new CopyWebpackPlugin([ { from: 'src/assets/netlify'} ]);
const MediaPlugin = new CopyWebpackPlugin([ { from: 'src/assets/media', to: 'media'} ]);


const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: "Can't Be Evil",
  meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  xhtml: true
});

module.exports = {
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.resolve('public/build'),
    filename: 'index_bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "can't-be-evil": "true"
    },
    proxy: {
      '/proxy': '',
      pathRewrite: {'^/proxy' : 'https://'}
    }
  },
  module: {
    rules: [
      { test: /\.css$/i,
        exclude: /\.lazy\.css$/i,
        use: [
        {
          loader: 'style-loader',
          options: { attributes: { class: 'style-theme' },
                     injectType: 'linkTag' },
        },
        'css-loader',
      ]},
      { test: /\.lazy\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { attributes: { id: 'lazy-theme' },
                       injectType: 'lazyStyleTag' },
          },
          'css-loader',
        ]},
      { test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          {
            loader: 'style-loader',
            options: { attributes: { id: 'lazy-theme' },
                       injectType: 'lazyStyleTag' },
          },
          'css-loader',
          'sass-loader'
        ]
      },
      { test: /\.jsx$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", '@babel/preset-env']
        } },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-react", '@babel/preset-env']
          }
        }},
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'file-loader!url-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'file-loader!url-loader',
      }
    ]
  },
  resolve: {
    alias: { react: require.resolve("react") }
  },
  plugins: [HtmlWebpackPluginConfig, ManifestAssetPlugin, IconAssetPlugin,
    NetlifyPlugin, MediaPlugin]
}
