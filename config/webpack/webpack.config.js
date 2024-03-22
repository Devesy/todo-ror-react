// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require('shakapacker')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const customConfig = {
//   module: {
//     rules: [
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           MiniCssExtractPlugin.loader,
//           // Creates `style` nodes from JS strings
//           "style-loader",
//           // Translates CSS into CommonJS
//           "css-loader",
//           // Compiles Sass to CSS
//           "sass-loader",
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.css', '.scss']
//   }
// }

const customConfig = {}

const webpackConfig = generateWebpackConfig(customConfig)

module.exports = webpackConfig
