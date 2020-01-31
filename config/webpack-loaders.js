const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports['webpack-loaders'] = function (sails) {
  return [
    {
      res: {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file)
          && !/\.vue\.js/.test(file)
        ),
      },
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      env: ['hot-dev', 'dev'],
      enabled: true
    },
    {
      res: {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      env: ['prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      env: ['hot-dev', 'dev'],
      enabled: true
    },
    {
      res: {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      env: ['prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      env: ['hot-dev', 'dev'],
      enabled: true
    },
    {
      res: {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      env: ['prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.(gif|jpg|png)$/,
        use: {
          loader: 'url-loader?limit=20480&name=images/[name].[hash:8].[ext]'
        }
      },
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: {
          loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
        }
      },
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.html$/,
        use: [{
          loader: 'html-loader?interpolate'
        }],
      },
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.art$/,
        loader: 'art-template-loader',
      },
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    }
  ]
};
