const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV, // 开发模式
  entry: path.resolve(__dirname, 'example/index.ts'), // 入口文件
  output: {
    filename: 'js/bundle-[name]-[hash:5].js', // 打包后的文件名称
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    usedExports: true,
    minimize: true,
    // 拆分代码
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    // 5.x 版本写法
    static: path.resolve('./public'),
  },
  // 设置别名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // 通过这里的配置，@ 符号等同于src
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      template: 'index.html',
      inject: 'body',
      minify: {
        removeAttributeQuotes: true, // 删除属性的双引号，除了一些特殊的删除不了以外都能删除
        collapseWhitespace: true, // 折叠空行将所有代码变成一行
        removeComments: true, // 移除注释
      },
      hash: true, // 给打包后在模板中引入的文件名生成 hash 戳，防止缓存
    }),
    // 每次打包前清除上一次的结果
    new CleanWebpackPlugin(),
    // 打包过程中加进度条
    new ProgressBarPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.js$/,
        // use:'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            // babel-loader选项
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-typescript',
              {
                allExtensions: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-typescript',
              {
                allExtensions: true,
              },
            ],
          ],
        },
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化 esModule: false, outputPath: 'imgs'
        },
      },
      {
        // 处理 html 中 img 资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
};
