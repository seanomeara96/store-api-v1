const path = require('path');
console.log(path.resolve(__dirname, 'scripts/front-end/dist'))
module.exports = {
  entry: './scripts/front-end/countdown.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'scripts/front-end/dist'),
    filename: 'countdown-build.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};