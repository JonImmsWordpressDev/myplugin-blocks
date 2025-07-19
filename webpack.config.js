module.exports = {
  entry: {
    'alert-box': './blocks/alert-box/edit.js',
    'latest-posts': './blocks/latest-posts/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  }
};