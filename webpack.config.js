const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const webpackMerge = require('webpack-merge')

const modeConfig = env => require(`./utils/build/webpack.${env}`)(env)
const preset = require('./utils/build/loadPresets')

module.exports = ({mode, presets} = {mode: 'production', presets: []}) => {
  console.log('OVO', presets)
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader'],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  fallback: require.resolve('responsive-loader'),
                  quality: 85,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          cache: true,
          title: 'Hol',
          showErrors: true,
          template: path.join(__dirname, 'public', 'index.html'),
        }),
        new FaviconsWebpackPlugin({
          cache: true,
          logo: path.join(__dirname, 'public', 'favicon.png'),
        }),
        new webpack.ProgressPlugin(),
      ],
    },
    modeConfig(mode),
    preset({mode, presets}),
  )
}
