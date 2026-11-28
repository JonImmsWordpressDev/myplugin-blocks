const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      'alert-box': './blocks/alert-box/index.js',
      'latest-posts': './blocks/latest-posts/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: isProduction ? 'compressed' : 'expanded',
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    externals: {
      '@wordpress/blocks': ['wp', 'blocks'],
      '@wordpress/block-editor': ['wp', 'blockEditor'],
      '@wordpress/components': ['wp', 'components'],
      '@wordpress/element': ['wp', 'element'],
      '@wordpress/i18n': ['wp', 'i18n'],
      '@wordpress/data': ['wp', 'data'],
      '@wordpress/date': ['wp', 'date'],
      '@wordpress/html-entities': ['wp', 'htmlEntities'],
    },
    devtool: isProduction ? false : 'source-map',
    performance: {
      hints: isProduction ? 'warning' : false,
    },
  };
};
