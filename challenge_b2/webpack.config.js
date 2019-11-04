const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: [/\.jsx?/, /\.js?/],
        include: './src',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [@babel/preset-env, @babel/preset-react]
          }
        }
      }
    ]
  }
};
