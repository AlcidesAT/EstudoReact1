const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        exclude: [ path.resolve(__dirname, 'node_modules') ],
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.ts' ],
  },
  externalsPresets: { node: true },
}
