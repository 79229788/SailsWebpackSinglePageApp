const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports['webpack-loaders'] = function (sails) {
  return [
    {
      res: {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader?presets[]=es2015',
              css: ['vue-style-loader', 'css-loader'],
              scss: ['vue-style-loader', 'css-loader', 'sass-loader']
            }
          }
        }
      },
      env: ['webpack-dev'],
      enabled: true
    },
    {
      res: {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader?presets[]=es2015&plugins[]=syntax-dynamic-import',
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
              }),
              scss: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'vue-style-loader'
              })
            }
          }
        }
      },
      env: ['dev', 'pro', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.js$/,
        include: /(assets\/js|libs\/comber|iview)/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: false,
            presets: ['es2015'],
            plugins: ['syntax-dynamic-import']
          },
        }
      },
      env: ['webpack-dev', 'dev', 'pro', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      env: ['webpack-dev'],
      enabled: true
    },
    {
      res: {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      env: ['dev'],
      enabled: true
    },
    {
      res: {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'style-loader'
        })
      },
      env: ['pro', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      env: ['webpack-dev'],
      enabled: true
    },
    {
      res: {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        })
      },
      env: ['dev'],
      enabled: true
    },
    {
      res: {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'sass-loader'],
          fallback: 'style-loader',
        })
      },
      env: ['pro', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.(gif|jpg|png)$/,
        use: {
          loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
        }
      },
      env: ['webpack-dev', 'dev', 'pro', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.(woff|svg|eot|ttf)$/,
        use: {
          loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
        }
      },
      env: ['webpack-dev', 'dev', 'pro', 'deploy'],
      enabled: true
    },
    {
      res: {
        test: /\.html$/,
        use: [{
          loader: 'html-loader?interpolate'
        }],
      },
      env: ['webpack-dev', 'dev', 'pro', 'deploy'],
      enabled: true
    }
  ]
};
