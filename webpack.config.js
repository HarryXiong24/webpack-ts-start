const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV, // 开发模式
  entry: path.resolve(__dirname, 'src/main.ts'), // 入口文件
  output: {
    filename:'js/bundle-[name]-[hash:5].js', // 打包后的文件名称
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization:{
    usedExports: true,
    minimize: true,
    // 拆分代码
    splitChunks:{
      chunks:'all'
    },
    minimizer:[
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ]
  },
  devServer:{
    port: 8080,
    hot: true,
    open: true,
    // 5.x 版本写法
    static:path.resolve('./public')
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'index',
      template:'./index.html',
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //       // 把 public 文件夹复制到输出目录
    //       // './public',
    //       // 把 assets 复制到输出目录中的 assets 文件夹
    //       // { from: "./src/assets", to: "assets" },
    //   ],
    // }),
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader',                 
          {
            loader:'css-loader',
          },
          {
            loader:'postcss-loader',
            options:{
              postcssOptions: { 
                plugins: ['autoprefixer']
              }
            }
          }
        ],
      },
      {
        test:/\.scss$/,
        use:['style-loader', 'css-loader',
        {
          loader:'postcss-loader',
          options:{
            postcssOptions: { 
              plugins: ['autoprefixer']
            }
          }
        }, 'sass-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader', 'css-loader', 
        {
          loader:'postcss-loader',
          options:{
            postcssOptions: { 
              plugins: ['autoprefixer']
            }
          }
        }, 'less-loader']
      },
      {
        test:/\.js$/,
        // use:'babel-loader', 
        use:{
            loader:'babel-loader',
            options:{
              // babel-loader选项
              presets:['@babel/preset-env', '@babel/preset-typescript']
            }
        }
      },
      {
        test:/\.ts$/,
        // use:'babel-loader', 
        use:{
            loader:'babel-loader',
            options:{
              // babel-loader选项
              presets:['@babel/preset-env', '@babel/preset-typescript']
            }
        }
      },
    ]
  }
}
